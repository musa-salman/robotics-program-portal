import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';

export class EventStudentRepository extends BaseRepository<BriefStudent> {
  constructor(id: string) {
    super(db, 'events/' + id + '/registered-students');
  }
}
