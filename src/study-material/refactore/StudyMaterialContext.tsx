import { createContext, useContext } from 'react';
import { StudyMaterialRepository } from '../repository/StudyMaterialRepository';

export const StudyMaterialContext = createContext<StudyMaterialRepository>(new StudyMaterialRepository());

function StudyMaterialProvider({ children }: { children: React.ReactNode }) {
  const studyMaterialRepository = useContext(StudyMaterialContext);

  return <StudyMaterialContext.Provider value={studyMaterialRepository}>{children}</StudyMaterialContext.Provider>;
}

export default StudyMaterialProvider;
