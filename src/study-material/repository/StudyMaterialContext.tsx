import { createContext, useContext } from 'react';
import { StudyMaterialManagement } from './StudyMaterialManagement';

export const StudyMaterialContext = createContext<StudyMaterialManagement>(new StudyMaterialManagement());

function StudyMaterialProvider({ children }: { children: React.ReactNode }) {
  const studyMaterialRepository = useContext(StudyMaterialContext);

  return <StudyMaterialContext.Provider value={studyMaterialRepository}>{children}</StudyMaterialContext.Provider>;
}

export default StudyMaterialProvider;
