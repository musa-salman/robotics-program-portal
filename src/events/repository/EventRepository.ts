import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { IEvent } from './Event';

/**
 * Represents a repository for managing events.
 */
export class EventRepository extends BaseRepository<IEvent> {
  constructor() {
    super(db, 'events');
  }
}
