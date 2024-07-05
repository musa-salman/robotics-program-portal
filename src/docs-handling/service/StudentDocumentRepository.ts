import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { StudentDocument } from './StudentDocument';

export class StudentDocumentRepository extends BaseRepository<StudentDocument> {
  constructor(studentId: string) {
    super(db, `students/${studentId}/documents`);
  }
}
