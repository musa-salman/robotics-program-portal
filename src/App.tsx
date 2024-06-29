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
import UnauthorizedPage from './components/UnauthorizedPage';

function App() {
  const routeConfigurations = {
    authorizedRoutes: [
      {
        path: '/study-materials',
        element: <StudyMaterialContainer />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student]
      },
      {
        path: '/events',
        element: <EventContainer />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student]
      },
      {
        path: '/students',
        element: <StudentsManagement />,
        allowedRoles: [Role.Admin, Role.Owner]
      },
      {
        path: '/registers',
        element: <RegisterManagement />,
        allowedRoles: [Role.PreEnrollment]
      },
      {
        path: '/register',
        element: <RegisterComponent />,
        allowedRoles: [Role.PreEnrollment],
        roleToComponentMap: {
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/approvalPage',
        element: <WaitApprovalPage />,
        allowedRoles: [Role.Pending],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />
        }
      }
    ],
    publicRoutes: [
      {
        path: '/401',
        element: <UnauthorizedPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Banner />} />
        {routeConfigurations.authorizedRoutes.map((route, index) => {
          return (
            <RoleBasedAccessControl
              key={index}
              allowedRoles={route.allowedRoles}
              roleToComponentMap={route.roleToComponentMap}>
              <Route path={route.path} element={route.element} />
            </RoleBasedAccessControl>
          );
        })}
        {routeConfigurations.publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
