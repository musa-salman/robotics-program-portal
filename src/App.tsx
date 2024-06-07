import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/components/RoleBasedAccessControl';
import { useAuthRoutes } from './authentication/AuthRoutes';
import { useStudyMaterialRoutes } from './study-material/StudyMaterialRoutes';
import EventContainer from './events/EventContainer';
import Layout from './components/layout/Layout';
import TestingLayout from './components/layout/TestingLayout';
import Role from './authentication/components/Roles';
import Banner from './components/Banner';
import StudentContainer from './students_management/StudentContainer';

function App() {
  const AuthRoutes = useAuthRoutes();
  const StudyMaterialRoutes = useStudyMaterialRoutes();

  return (
    <>
      <Routes>
        <Route path="/" element={<TestingLayout />}>
          {AuthRoutes}
          <Route path="/" element={<Layout />}>
            {StudyMaterialRoutes}
            <Route path="/" element={<Banner />} />
            <Route path="/events" element={<EventContainer />} />
            <Route path="/students" element={<StudentContainer />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <RoleBasedAccessControl allowedRoles={[Role.Admin]}>
                    <div>Dashboard</div>
                  </RoleBasedAccessControl>
                </>
              }
            />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
