import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { EventRegistrationRepository } from './EventRegistrationRepository';

export class EventRegistrationRepositories {
  private eventRegistrationRepositories: Map<string, EventRegistrationRepository>;

  constructor() {
    this.eventRegistrationRepositories = new Map<string, EventRegistrationRepository>();
  }

  getEventRegistrationRepository(eventId: string): EventRegistrationRepository {
    if (!this.eventRegistrationRepositories.has(eventId)) {
      this.eventRegistrationRepositories.set(eventId, new CachingRepository(new EventRegistrationRepository(eventId)));
    }

    return this.eventRegistrationRepositories.get(eventId)!;
  }
}
