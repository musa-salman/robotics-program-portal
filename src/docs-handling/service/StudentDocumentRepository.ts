import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { StudentDocument } from './StudentDocument';

/**
 * Represents a repository for managing student documents.
 */
export class StudentDocumentRepository extends BaseRepository<StudentDocument> {
  constructor(studentId: string) {
    super(db, `students/${studentId}/documents`);
  }
}
