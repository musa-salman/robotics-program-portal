import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { DocumentInfo } from './DocumentInfo';

/**
 * Represents a repository for managing documents.
 * @template DocumentInfo - The type of document information.
 */
class DocumentRepository extends BaseRepository<DocumentInfo> {
  constructor() {
    super(db, 'documents');
  }
}

export { DocumentRepository };
