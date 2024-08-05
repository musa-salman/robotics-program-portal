import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { StudentEventRepository } from './StudentEventRepository';

/**
 * Represents a collection of student event repositories.
 */
export class StudentEventRepositories {
  private studentEventRepositories: Map<string, StudentEventRepository>;

  constructor() {
    this.studentEventRepositories = new Map<string, StudentEventRepository>();
  }

  /**
   * Retrieves the student event repository for the specified student ID.
   * If the repository does not exist, it creates a new one and caches it.
   *
   * @param studentId - The ID of the student.
   * @returns The student event repository.
   */
  getStudentEventRepository(studentId: string): StudentEventRepository {
    if (!this.studentEventRepositories.has(studentId)) {
      this.studentEventRepositories.set(studentId, new CachingRepository(new StudentEventRepository(studentId)));
    }

    return this.studentEventRepositories.get(studentId)!;
  }
}
