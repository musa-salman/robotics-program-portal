import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';

/**
 * Represents a repository for managing event registrations.
 * @template T - The type of the student registration.
 */
export class EventRegistrationRepository extends BaseRepository<BriefStudent> {
  constructor(id: string) {
    super(db, 'events/' + id + '/participants');
  }
}
