import { BriefEvent } from './BriefEvent';
import { EventRegistrationRepository } from './EventRegistrationRepository';
import { StudentEventRepository } from './StudentEventRepository';

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
