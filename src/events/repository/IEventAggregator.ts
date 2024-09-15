import { IEvent } from './Event';

/**
 * Interface for aggregating event-related data.
 */
export interface IEventAggregator {
  /**
   * Aggregates event registrations.
   * @returns {Promise<Record<string, IEvent & { count: number }>>} A promise that resolves to a record where each key is an event ID and the value is an event object with an additional count property indicating the number of registrations.
   */
  aggregateEventRegistrations(): Promise<Record<string, IEvent & { count: number }>>;

  /**
   * Retrieves the count of event creations over time.
   * @returns {Promise<Record<string, IEvent & { count: number }>>} A promise that resolves to a record where each key is a time period (e.g., month, year) and the value is an event object with an additional count property indicating the number of events created in that period.
   */
  eventCreationOverTime(): Promise<Record<string, IEvent & { count: number }>>;

  /**
   * Calculates the average number of registrations per event.
   * @returns {Promise<number>} A promise that resolves to the average number of registrations per event.
   */
  averageEventRegistrations(): Promise<number>;
}
