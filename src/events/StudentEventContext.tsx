import { createContext, useContext } from 'react';
import { StudentEventRepository } from './StudentEventRepository';
import { CachingRepository } from '../repositories/caching/CachingRepository';

export const StudentEventContext = createContext<StudentEventRepository>(
  new CachingRepository(new StudentEventRepository())
);

function StudentEventProvider({ children }: { children: React.ReactNode }) {
  const eventRepository = useContext(StudentEventContext);

  return <StudentEventContext.Provider value={eventRepository}>{children}</StudentEventContext.Provider>;
}

export default StudentEventProvider;
