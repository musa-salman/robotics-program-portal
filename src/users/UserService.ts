import { doc, writeBatch } from 'firebase/firestore';
import Role from '../authentication/components/Roles';
import { User } from './User';
import { UserRepository } from './UserRepository';
import { db } from '../firebase';
import { StudentRepository } from '../students-management/StudentRepository';
import { StudentEventRepositories } from '../events/repository/StudentEventRepositories';
import { EventRegistrationRepositories } from '../events/repository/EventRegistrationRepositories';
import { RegisterRepository } from '../register/service/RegisterRepository';

/**
 * Interface for the user service.
 */
export interface IUserService {
  getUserRepository(): UserRepository;
  getStudentRepository(): StudentRepository;
  addRoleToUser(userId: string, role: Role): Promise<void>;
  deleteRoleFromUser(userId: string, role: Role): Promise<void>;
  jumpToAdminRole(user: User): Promise<void>;
  deleteUser(userId: string): Promise<void>;
  getUsers(): Promise<User[]>;
  getUserRoles(userId: string): Promise<Role[]>;
}

/**
 * Represents a service for managing users.
 */
export class UserService implements IUserService {
  private readonly userRepository: UserRepository;
  private readonly studentRepository: StudentRepository;
  private readonly eventRegistrationRepositories: EventRegistrationRepositories;
  private readonly studentEventRepositories: StudentEventRepositories;
  private readonly registrationRepository: RegisterRepository;

  constructor(
    userRepository: UserRepository,
    studentRepository: StudentRepository,
    eventRegistrationRepositories: EventRegistrationRepositories,
    studentEventRepositories: StudentEventRepositories,
    registerRepository: RegisterRepository
  ) {
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
    this.eventRegistrationRepositories = eventRegistrationRepositories;
    this.studentEventRepositories = studentEventRepositories;
    this.registrationRepository = registerRepository;
  }

  getUserRepository(): UserRepository {
    return this.userRepository;
  }

  getStudentRepository(): StudentRepository {
    return this.studentRepository;
  }

  addRoleToUser(userId: string, role: Role): Promise<void> {
    return this.userRepository.findOne(userId).then((user) => {
      if (user && !user.roles.includes(role)) {
        user.roles.push(role);
        return this.userRepository.update(userId, user);
      }
    });
  }

  jumpToAdminRole(user: User): Promise<void> {
    const batch = writeBatch(db);

    if (user.roles.includes(Role.Pending)) {
      batch.delete(doc(this.registrationRepository._collection, user.id));
    }

    user.roles = [Role.Admin];
    return batch.update(doc(this.userRepository._collection, user.id), { ...user }).commit();
  }

  async deleteRoleFromUser(userId: string, role: Role): Promise<void> {
    if (
      role === Role.Owner &&
      (await this.userRepository.find().then((users) => {
        return users.filter((user) => user.roles.includes(Role.Owner)).length <= 1;
      }))
    ) {
      throw new Error('אי אפשר למחוק את התפקיד האחרון של בעל המערכת');
    }

    return this.userRepository.findOne(userId).then((user) => {
      if (user && user.roles.includes(role)) {
        user.roles = user.roles.filter((r) => r !== role);
        return this.userRepository.update(userId, user);
      }
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const batch = writeBatch(db);

    const student = await this.studentRepository.findOne(userId);
    if (student) {
      const registeredEvents = await this.studentEventRepositories.getStudentEventRepository(userId).find();
      registeredEvents.forEach((event) => {
        batch.delete(
          doc(this.eventRegistrationRepositories.getEventRegistrationRepository(event.id)._collection, userId)
        );
      });
      batch.delete(doc(this.studentRepository._collection, userId));
      batch.delete(doc(this.studentEventRepositories.getStudentEventRepository(userId)._collection));
    }

    batch.update(doc(this.userRepository._collection, userId), { roles: [Role.deleted] });
    return batch.commit();
  }

  getUsers(): Promise<User[]> {
    return this.getUserRepository().find();
  }

  getUserRoles(userId: string): Promise<Role[]> {
    console.log(this.userRepository);
    return this.userRepository.findOne(userId).then((user) => (user ? user.roles : []));
  }
}
