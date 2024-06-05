import { Route } from 'react-router-dom';
import StudyMaterialContainer from './StudyMaterialContainer';

export const useStudyMaterialRoutes = () => {
  return (
    <Route
      path="/study-material"
      element={
        <>
          <StudyMaterialContainer />
        </>
      }
    />
  );
};
