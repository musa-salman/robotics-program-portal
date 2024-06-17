import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';

export class StudentEventRepository extends BaseRepository<BriefStudent> {
  constructor(id: string) {
    super(db, 'students/' + id + '/events');
  }
}
