import { doc, writeBatch } from 'firebase/firestore';
import { BriefEvent } from './BriefEvent';
import { EventRegistrationRepository } from './EventRegistrationRepository';
import { EventRepository } from './EventRepository';
import { db } from '../../firebase';
import { StudentEventRepository } from './StudentEventRepository';
import { EventRegistrationRepositories } from './EventRegistrationRepositories';
import { StudentEventRepositories } from './StudentEventRepositories';
import { IEvent } from './Event';

/**
 * Represents the interface for managing events.
 */
export interface IEventService {
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

export interface IEventAggregator {
  aggregateEventRegistrations(): Promise<Record<string, IEvent & { count: number }>>;
  eventCreationOverTime(): Promise<Record<string, IEvent & { count: number }>>;
  averageEventRegistrations(): Promise<number>;
}

export class EventService implements IEventService, IEventAggregator {
  readonly eventRepository: EventRepository;

  // Map of event registration repositories, keyed by event ID.
  readonly eventRegistrationRepositories: EventRegistrationRepositories;

  // Map of student event repositories, keyed by student ID.
  readonly studentEventRepositories: StudentEventRepositories;

  constructor(
    eventRepository: EventRepository,
    eventRegistrationRepositories: EventRegistrationRepositories,
    studentEventRepositories: StudentEventRepositories
  ) {
    this.eventRepository = eventRepository;
    this.eventRegistrationRepositories = eventRegistrationRepositories;
    this.studentEventRepositories = studentEventRepositories;
  }

  getStudentEventRepository(studentId: string): StudentEventRepository {
    return this.studentEventRepositories.getStudentEventRepository(studentId);
  }

  getEventRegistrationRepository(eventId: string): EventRegistrationRepository {
    return this.eventRegistrationRepositories.getEventRegistrationRepository(eventId);
  }

  async registerStudentForEvent(student: BriefStudent, eventId: string): Promise<void> {
    const studentEventDocRef = doc(this.getStudentEventRepository(student.id)._collection, eventId);
    const eventRef = doc(this.getEventRegistrationRepository(eventId)._collection, student.id);

    const registered: BriefEvent = {
      id: eventId
    };

    const batch = writeBatch(db);
    return batch
      .set(studentEventDocRef, registered)
      .set(eventRef, student)
      .commit()
      .then(() => {
        this.getStudentEventRepository(student.id).findOne(eventId);
      });
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

  async isStudentRegistered(studentId: string | undefined, eventId: string): Promise<boolean> {
    if (!studentId) {
      return false;
    }

    const studentEventRepository = this.getStudentEventRepository(studentId);
    const studentEventDoc = await studentEventRepository.find();

    return studentEventDoc.some((event) => event.id === eventId);
  }

  async deleteEvent(eventId: string): Promise<void> {
    const eventRef = doc(this.eventRepository._collection, eventId);
    const registeredStudents = await this.getRegisteredStudents(eventId);

    const batch = writeBatch(db);

    batch.delete(eventRef);
    batch.delete(doc(this.eventRegistrationRepositories.getEventRegistrationRepository(eventId)._collection));
    registeredStudents.forEach((student) => {
      batch.delete(doc(this.getStudentEventRepository(student.id)._collection, eventId));
    });

    return batch.commit();
  }

  async aggregateEventRegistrations(): Promise<Record<string, IEvent & { count: number }>> {
    const eventRegistrations = await this.eventRepository.find();
    const eventRegistrationCounts: Record<string, IEvent & { count: number }> = {};

    for (const event of eventRegistrations) {
      const registrations = await this.getRegisteredStudents(event.id);

      eventRegistrationCounts[event.title] = event as IEvent & { count: number };
      eventRegistrationCounts[event.title].count = registrations.length;
    }

    return eventRegistrationCounts;
  }

  async eventCreationOverTime(): Promise<Record<number, IEvent & { count: number }>> {
    const events = await this.eventRepository.find();
    const eventCreationCounts: Record<number, IEvent & { count: number }> = {};

    for (const event of events) {
      const date = event.startDate.getTime();
      eventCreationCounts[date].count = (eventCreationCounts[date].count || 0) + 1;
    }

    return eventCreationCounts;
  }

  averageEventRegistrations(): Promise<number> {
    return this.aggregateEventRegistrations().then((eventRegistrationCounts) => {
      const totalRegistrations = Object.values(eventRegistrationCounts).reduce(
        (acc, participantCount) => acc + participantCount.count,
        0
      );
      return totalRegistrations / Object.keys(eventRegistrationCounts).length;
    });
  }
}
