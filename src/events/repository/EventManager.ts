import { doc, writeBatch } from 'firebase/firestore';
import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { BriefEvent } from './BriefEvent';
import { EventRegistrationRepository } from './EventRegistrationRepository';
import { EventRepository } from './EventRepository';
import { db } from '../../firebase';
import { StudentEventRepository } from './StudentEventRepository';

/**
 * Represents the interface for managing events.
 */
export interface EventManagerInterface {
  /**
   * Registers a student for an event.
   * @param student - The student to register.
   * @param eventId - The ID of the event.
   */
  registerStudentForEvent(student: BriefStudent, eventId: string): void;

  /**
   * Cancels a student's registration for an event.
   * @param studentId - The ID of the student.
   * @param eventId - The ID of the event.
   */
  cancelRegistration(studentId: string, eventId: string): void;

  /**
   * Retrieves the list of registered students for a given event.
   * @param eventId - The ID of the event.
   * @returns A promise that resolves to an array of brief student objects.
   */
  getRegisteredStudents(eventId: string): Promise<BriefStudent[]>;

  /**
   * Retrieves the schedule of events for a given student.
   * @param studentId - The ID of the student.
   * @returns A promise that resolves to an array of brief event objects.
   */
  getStudentEventsSchedule(studentId: string): Promise<BriefEvent[]>;

  /**
   * Deletes an event.
   * @param eventId - The ID of the event to delete.
   */
  deleteEvent(eventId: string): Promise<void>;

  /**
   * Checks if a student is registered for an event.
   * @param studentId - The ID of the student.
   * @param eventId - The ID of the event.
   * @returns A promise that resolves to a boolean indicating if the student is registered.
   */
  isStudentRegistered(studentId: string, eventId: string): Promise<boolean>;

  /**
   * Retrieves the student event repository for a given student ID.
   * @param studentId - The ID of the student.
   * @returns The student event repository.
   */
  getStudentEventRepository(studentId: string): StudentEventRepository;

  /**
   * Retrieves the event registration repository for a given event ID.
   * @param eventId - The ID of the event.
   * @returns The event registration repository.
   */
  getEventRegistrationRepository(eventId: string): EventRegistrationRepository;
}

export class EventManager implements EventManagerInterface {
  readonly eventRepository: EventRepository;

  // Map of event registration repositories, keyed by event ID.
  readonly eventRegistrationRepositories: Map<string, EventRegistrationRepository>;

  // Map of student event repositories, keyed by student ID.
  readonly studentEventRepositories: Map<string, StudentEventRepository>;

  constructor() {
    this.eventRepository = new CachingRepository(new EventRepository());
    this.eventRegistrationRepositories = new Map<string, EventRegistrationRepository>();
    this.studentEventRepositories = new Map<string, StudentEventRepository>();
  }

  getStudentEventRepository(studentId: string): StudentEventRepository {
    if (!this.studentEventRepositories.has(studentId)) {
      this.studentEventRepositories.set(studentId, new CachingRepository(new StudentEventRepository(studentId)));
    }

    return this.studentEventRepositories.get(studentId)!;
  }

  getEventRegistrationRepository(eventId: string): EventRegistrationRepository {
    if (!this.eventRegistrationRepositories.has(eventId)) {
      this.eventRegistrationRepositories.set(eventId, new CachingRepository(new EventRegistrationRepository(eventId)));
    }

    return this.eventRegistrationRepositories.get(eventId)!;
  }

  async registerStudentForEvent(student: BriefStudent, eventId: string): Promise<void> {
    const studentEventDocRef = doc(this.getStudentEventRepository(student.id)._collection, eventId);
    const eventRef = doc(this.getEventRegistrationRepository(eventId)._collection, student.id);

    const registered: BriefEvent = {
      id: eventId
    };

    const batch = writeBatch(db);
    return batch.set(studentEventDocRef, registered).set(eventRef, student).commit();
  }

  async cancelRegistration(studentId: string, eventId: string): Promise<void> {
    const studentEventDocRef = doc(this.getStudentEventRepository(studentId)._collection, eventId);
    const eventRef = doc(this.getEventRegistrationRepository(eventId)._collection, studentId);

    const batch = writeBatch(db);
    return batch.delete(studentEventDocRef).delete(eventRef).commit();
  }

  async getRegisteredStudents(eventId: string): Promise<BriefStudent[]> {
    return this.getEventRegistrationRepository(eventId).find();
  }

  async getStudentEventsSchedule(studentId: string): Promise<BriefEvent[]> {
    return this.getStudentEventRepository(studentId).find();
  }

  async isStudentRegistered(studentId: string, eventId: string): Promise<boolean> {
    const studentEventRepository = this.getStudentEventRepository(studentId);
    const studentEventDoc = await studentEventRepository.findOne(eventId);

    console.log('studentEventDoc', studentEventDoc);
    console.log('eventId', eventId);

    return studentEventDoc == null;
  }

  async deleteEvent(eventId: string): Promise<void> {
    const eventRef = doc(this.eventRepository._collection, eventId);
    const registeredStudents = await this.getRegisteredStudents(eventId);

    const batch = writeBatch(db);

    batch.delete(eventRef);
    registeredStudents.forEach((student) => {
      batch.delete(doc(this.getStudentEventRepository(student.id)._collection, eventId));
    });

    return batch.commit();
  }
}
