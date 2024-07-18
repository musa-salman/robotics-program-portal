import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { StudentDocumentRepository } from './StudentDocumentRepository';

export class StudentDocumentRepositories {
  private readonly documentStudentRepositories: Map<string, StudentDocumentRepository>;

  constructor() {
    this.documentStudentRepositories = new Map();
  }

  getStudentDocumentRepository(studentDocId: string): StudentDocumentRepository {
    if (!this.documentStudentRepositories.has(studentDocId)) {
      this.documentStudentRepositories.set(
        studentDocId,
        new CachingRepository(new StudentDocumentRepository(studentDocId))
      );
    }

    return this.documentStudentRepositories.get(studentDocId)!;
  }
}
