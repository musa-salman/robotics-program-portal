import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { DocumentInfo } from './DocumentInfo';

class DocumentRepository extends BaseRepository<DocumentInfo> {
  constructor() {
    super(db, 'documents');
  }
}

export { DocumentRepository };
