import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { StudentEvent } from './StudentEventProps';

export class StudentEventRepository extends BaseRepository<StudentEvent> {
  constructor() {
    super(db, 'students-events');
  }
}
