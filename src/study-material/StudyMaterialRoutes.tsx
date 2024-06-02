import { Route } from 'react-router-dom';
import StudyMaterialContainer from './StudyMaterialContainer';
import { SearchBar } from './SearchBar';

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
