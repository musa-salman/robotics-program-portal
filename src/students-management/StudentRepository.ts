import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { Student } from './Student';

/**
 * Represents a repository for managing student data.
 * @template T - The type of student data.
 */
export class StudentRepository extends BaseRepository<Student> {
  constructor() {
    super(db, 'students');
  }
}
