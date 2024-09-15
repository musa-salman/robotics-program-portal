import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { DocumentStudent } from './DocumentStudent';

/**
 * Represents a repository for managing student documents.
 */
export class DocumentStudentRepository extends BaseRepository<DocumentStudent> {
  constructor(documentId: string) {
    super(db, 'documents/' + documentId + '/students');
  }
}
