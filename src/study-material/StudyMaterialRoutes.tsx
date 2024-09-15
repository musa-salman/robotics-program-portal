import { Route } from 'react-router-dom';
import StudyMaterialContainer from './StudyMaterialContainer';

/**
 * Custom hook for defining study material routes.
 * @returns The study material route component.
 */
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
