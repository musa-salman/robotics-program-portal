import { doc, writeBatch } from 'firebase/firestore';
import { StudentRepository } from '../../students-management/StudentRepository';
import { UserRepository } from '../../users/UserRepository';
import { Register } from '../Register';
import { db } from '../../firebase';
import Role from '../../authentication/components/Roles';
import { RegisterRepository } from './RegisterRepository';

/**
 * Represents a service for registering students.
 */
export interface IRegisterService {
  /**
   * Registers a student.
   * @param register - The registration details.
   * @returns A promise that resolves when the student is registered successfully.
   */
  registerStudent(register: Register): Promise<void>;

  /**
   * Rejects a registration.
   * @param registerId - The ID of the registration to reject.
   * @returns A promise that resolves when the registration is rejected successfully.
   */
  rejectRegister(registerId: string): Promise<void>;

  /**
   * Approves a registration.
   * @param register - The registration details.
   * @returns A promise that resolves when the registration is approved successfully.
   */
  approveRegister(register: Register): Promise<void>;

  /**
   * Retrieves all registers.
   * @returns A promise that resolves with an array of registers.
   */
  getRegisters(): Promise<Register[]>;
}

export class RegisterService implements IRegisterService {
  public readonly registerRepository: RegisterRepository;
  private readonly studentRepository: StudentRepository;
  private readonly userRepository: UserRepository;

  constructor(
    registerRepository: RegisterRepository,
    studentRepository: StudentRepository,
    userRepository: UserRepository
  ) {
    this.registerRepository = registerRepository;
    this.studentRepository = studentRepository;
    this.userRepository = userRepository;
  }

  registerStudent(register: Register): Promise<void> {
    return writeBatch(db)
      .set(doc(this.registerRepository._collection, register.id), register)
      .update(doc(this.userRepository._collection, register.id), {
        id: register.id,
        roles: [Role.Pending]
      })
      .commit();
  }

  rejectRegister(registerId: string): Promise<void> {
    return writeBatch(db)
      .update(doc(this.userRepository._collection, registerId), {
        roles: [Role.Rejected]
      })
      .delete(doc(this.registerRepository._collection, registerId))
      .commit();
  }

  approveRegister(register: Register): Promise<void> {
    return writeBatch(db)
      .delete(doc(this.registerRepository._collection, register.id))
      .set(doc(this.studentRepository._collection, register.id), {
        id: register.id,
        studentId: register.studentId,
        firstName: register.firstName,
        lastName: register.lastName,
        studentPhoneNumber: register.studentPhoneNumber,
        parentPhoneNumber: register.parentPhoneNumber,
        studentEmail: register.studentEmail,
        parentEmail: register.parentEmail,
        studentAddress: register.studentAddress,
        studentSchool: register.studentSchool
      })
      .update(doc(this.userRepository._collection, register.id), {
        roles: [Role.Student]
      })
      .commit();
  }

  getRegisters(): Promise<Register[]> {
    return this.registerRepository.find();
  }
}
