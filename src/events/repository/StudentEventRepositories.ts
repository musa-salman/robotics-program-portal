import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { StudentEventRepository } from './StudentEventRepository';

export class StudentEventRepositories {
  private studentEventRepositories: Map<string, StudentEventRepository>;

  constructor() {
    this.studentEventRepositories = new Map<string, StudentEventRepository>();
  }

  getStudentEventRepository(studentId: string): StudentEventRepository {
    if (!this.studentEventRepositories.has(studentId)) {
      this.studentEventRepositories.set(studentId, new CachingRepository(new StudentEventRepository(studentId)));
    }

    return this.studentEventRepositories.get(studentId)!;
  }
}
