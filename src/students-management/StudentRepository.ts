import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { Student } from './Student';

export class StudentRepository extends BaseRepository<Student> {
  constructor() {
    super(db, 'students');
  }
}
