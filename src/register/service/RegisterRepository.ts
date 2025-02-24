import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { Register } from '../Register';

/**
 * Represents a repository for managing registrations.
 * @template T - The type of the registration.
 */
export class RegisterRepository extends BaseRepository<Register> {
  constructor() {
    super(db, 'registers');
  }
}
