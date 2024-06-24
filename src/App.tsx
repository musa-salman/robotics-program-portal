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
import StudentsManagement from './students-management/StudentsManagement';
import NotFoundPage from './components/NotFoundPage';
import RegisterComponent from './register/RegisterComponent';
import GPTPlayGround from './gpt-service/GPTPlayGround';
import WaitApprovalPage from './wait-approval-page/WaitingApprovalPage';
import RegisterManagement from './registers-management/RegistersManagement';

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

            <Route
              path="/register"
              element={
                <RoleBasedAccessControl
                  allowedRoles={[Role.PreEnrollment]}
                  roleToComponentMap={{
                    [Role.Pending]: <WaitApprovalPage />
                  }}>
                  <RegisterComponent />
                </RoleBasedAccessControl>
              }
            />

            <Route
              path="/approvalPage"
              element={
                <RoleBasedAccessControl
                  allowedRoles={[Role.Pending]}
                  roleToComponentMap={{
                    [Role.PreEnrollment]: <RegisterComponent />
                  }}>
                  <WaitApprovalPage />
                </RoleBasedAccessControl>
              }
            />

            {/* 
              Admin routes
            */}
            <Route
              path="/students"
              element={
                <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]}>
                  <StudentsManagement />
                </RoleBasedAccessControl>
              }
            />
            <Route path="/registers" element={<RegisterManagement />} />

            <Route path="*" element={<NotFoundPage />} />

            {/* testing routes */}
            <Route path="/gpt" element={<GPTPlayGround />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
