import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/components/RoleBasedAccessControl';
import EventContainer from './events/EventContainer';
import Layout from './components/layout/Layout';
import Role from './authentication/components/Roles';
import Banner from './components/Banner';
import StudentsManagement from './students-management/StudentsManagement';
import NotFoundPage from './components/NotFoundPage';
import RegisterComponent from './register/RegisterComponent';
import WaitApprovalPage from './wait-approval-page/WaitingApprovalPage';
import RegisterManagement from './registers-management/RegistersManagement';
import StudyMaterialContainer from './study-material/StudyMaterialContainer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Banner />} />
        <Route
          path="/study-materials/"
          element={
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner, Role.Student]}>
              <StudyMaterialContainer />
            </RoleBasedAccessControl>
          }
        />
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

        <Route
          path="/students"
          element={
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]}>
              <StudentsManagement />
            </RoleBasedAccessControl>
          }
        />

        <Route
          path="/registers"
          element={
            <RoleBasedAccessControl allowedRoles={[Role.PreEnrollment]}>
              <RegisterManagement />
            </RoleBasedAccessControl>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
