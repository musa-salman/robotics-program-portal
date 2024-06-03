import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/components/RoleBasedAccessControl';
import { useAuthRoutes } from './authentication/AuthRoutes';
import { useStudyMaterialRoutes } from './study-material/StudyMaterialRoutes';
import EventContainer from './events/EventContainer';
import LogoutButton from './authentication/components/Logout';
import Layout from './components/layout/Layout';
import TestingLayout from './components/layout/TestingLayout';

function App() {
  const AuthRoutes = useAuthRoutes();
  const StudyMaterialRoutes = useStudyMaterialRoutes();

  return (
    <>
      <Routes>
        <Route path="/" element={<TestingLayout />}>
          <Route path="/" element={<Layout />}>
            {AuthRoutes}
            {StudyMaterialRoutes}
            <Route path="/events" element={<EventContainer />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <RoleBasedAccessControl allowedRoles={['admin', 'manager', 'student']}>
                    <LogoutButton />
                  </RoleBasedAccessControl>
                  <RoleBasedAccessControl allowedRoles={['admin']}>
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
