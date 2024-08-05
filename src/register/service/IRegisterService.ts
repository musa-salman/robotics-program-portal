import { Register } from '../Register';

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
