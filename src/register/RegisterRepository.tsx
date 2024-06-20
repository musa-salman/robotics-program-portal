import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { Register } from './register';

export class RegisterRepository extends BaseRepository<Register> {
  constructor() {
    super(db, 'register');
  }
}
