import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { DocumentStudentRepository } from './DocumentStudentRepository';

export class DocumentStudentRepositories {
  private readonly documentStudentRepositories: Map<string, DocumentStudentRepository>;

  constructor() {
    this.documentStudentRepositories = new Map();
  }

  getDocumentStudentRepository(documentId: string): DocumentStudentRepository {
    if (!this.documentStudentRepositories.has(documentId)) {
      this.documentStudentRepositories.set(
        documentId,
        new CachingRepository(new DocumentStudentRepository(documentId))
      );
    }

    return this.documentStudentRepositories.get(documentId)!;
  }
}
