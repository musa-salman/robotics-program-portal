import { MockRepository } from '../repositories/MockRepository';
import { IUserRepository } from './IUserRepository';
import { User } from './User';

export class MockUserRepository
  extends MockRepository<User>
  implements IUserRepository
{
  async getUserRole(uid: string): Promise<string> {
    return (await this.findOne(uid))?.role || 'guest';
  }
}
