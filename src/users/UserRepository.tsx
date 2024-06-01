import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { IUserRepository } from './IUserRepository';
import { User } from './User';

/**
 * Repository class for managing user data.
 * Extends the BaseRepository class and implements the IUserRepository interface.
 */
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(db, 'users');
  }

  /**
   * Retrieves the role of a user based on their unique identifier.
   * @param uid - The unique identifier of the user.
   * @returns A Promise that resolves to the role of the user.
   */
  async getUserRole(uid: string): Promise<string> {
    const user = await this.findOne(uid);
    if (user) {
      return user.role;
    } else {
      return 'guest';
    }
  }
}
