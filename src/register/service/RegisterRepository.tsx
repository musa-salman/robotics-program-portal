import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { Register } from '../Register';

export class RegisterRepository extends BaseRepository<Register> {
  constructor() {
    super(db, 'registers');
  }
}
