import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { EventRegistrationRepository } from './EventRegistrationRepository';

/**
 * Represents a collection of event registration repositories.
 */
export class EventRegistrationRepositories {
  private eventRegistrationRepositories: Map<string, EventRegistrationRepository>;

  constructor() {
    this.eventRegistrationRepositories = new Map<string, EventRegistrationRepository>();
  }

  /**
   * Retrieves the event registration repository for the specified event ID.
   * If the repository does not exist, it creates a new one and caches it.
   *
   * @param eventId - The ID of the event.
   * @returns The event registration repository.
   */
  getEventRegistrationRepository(eventId: string): EventRegistrationRepository {
    if (!this.eventRegistrationRepositories.has(eventId)) {
      this.eventRegistrationRepositories.set(eventId, new CachingRepository(new EventRegistrationRepository(eventId)));
    }

    return this.eventRegistrationRepositories.get(eventId)!;
  }
}
