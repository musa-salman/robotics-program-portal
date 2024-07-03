import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';

export class DocumentRepository extends BaseRepository<DocumentInfo> {
  constructor() {
    super(db, 'documents');
  }
}
