import { createContext, useContext } from 'react';
import { StudentRepository } from './StudentRepository';
import { CachingRepository } from '../repositories/caching/CachingRepository';

/**
 * Context object for managing user data.
 * @type {React.Context<StudentRepository>}
 */
export const StudentContext: React.Context<StudentRepository> = createContext<StudentRepository>(
  new CachingRepository(new StudentRepository())
);

/**
 * Provider for the StudentContext.
 * @param children The children to render.
 * @returns The rendered component.
 */
function StudentProvider({ children }: { children: React.ReactNode }) {
  const studentRepository = useContext(StudentContext);

  return <StudentContext.Provider value={studentRepository}>{children}</StudentContext.Provider>;
}

export default StudentProvider;
