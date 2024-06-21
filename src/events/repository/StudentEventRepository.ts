import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { BriefEvent } from './BriefEvent';

export class StudentEventRepository extends BaseRepository<BriefEvent> {
  constructor(id: string) {
    super(db, 'students/' + id + '/events');
  }
}
