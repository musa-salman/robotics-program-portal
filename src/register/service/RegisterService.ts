import { doc, writeBatch } from 'firebase/firestore';
import { StudentRepository } from '../../students-management/StudentRepository';
import { UserRepository } from '../../users/UserRepository';
import { Register } from '../Register';
import { db } from '../../firebase';
import Role from '../../authentication/components/Roles';
import { RegisterRepository } from './RegisterRepository';
import { IRegisterService } from './IRegisterService';
import { IRegisterAggregations } from './IRegisterAggregations';

export class RegisterService implements IRegisterService, IRegisterAggregations {
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

  countMajorRegistrations(): Promise<Record<string, number>> {
    return this.registerRepository.find().then((registers) => {
      return registers.reduce(
        (acc, register) => {
          acc[register.studyUnitsMajor] = (acc[register.studyUnitsMajor] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );
    });
  }

  collectMathUnitStatistics(): Promise<Record<string, number>> {
    return this.registerRepository.find().then((registers) => {
      return registers.reduce(
        (acc, register) => {
          acc[register.numStudyUnitsMath] = (acc[register.numStudyUnitsMath] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );
    });
  }
}
