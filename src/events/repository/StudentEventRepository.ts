import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { BriefEvent } from './BriefEvent';

/**
 * Represents a repository for managing student events.
 * @template T - The type of the events stored in the repository.
 */
export class StudentEventRepository extends BaseRepository<BriefEvent> {
  constructor(id: string) {
    super(db, 'students/' + id + '/events');
  }
}
