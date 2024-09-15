import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { User } from './User';

/**
 * Repository class for managing user data.
 * Extends the BaseRepository class and implements the IUserRepository interface.
 */
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(db, 'users');
  }
}
