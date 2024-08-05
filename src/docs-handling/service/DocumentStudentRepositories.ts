import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { StudentDocumentRepository } from './StudentDocumentRepository';

/**
 * Represents a collection of student document repositories.
 */
export class StudentDocumentRepositories {
  private readonly documentStudentRepositories: Map<string, StudentDocumentRepository>;

  constructor() {
    this.documentStudentRepositories = new Map();
  }

  /**
   * Retrieves the student document repository for the specified student document ID.
   * If the repository does not exist, it creates a new one and caches it for future use.
   *
   * @param studentDocId - The ID of the student document.
   * @returns The student document repository.
   */
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
