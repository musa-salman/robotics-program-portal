import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Route, Routes } from 'react-router-dom';
import { useStudyMaterialRoutes } from './study-material/StudyMaterialRoutes';
import RoleBasedAccessControl from './authentication/components/RoleBasedAccessControl';
import EventContainer from './events/EventContainer';
import Layout from './components/layout/Layout';
import TestingLayout from './components/layout/TestingLayout';
import Role from './authentication/components/Roles';
import Banner from './components/Banner';
import StudentsManagement from './students-management/StudentsManagement';
import NotFoundPage from './components/NotFoundPage';
import RegisterComponent from './register/RegisterComponent';
import GPTPlayGround from './gpt-service/GPTPlayGround';
import WaitApprovalPage from './authentication/components/wait-approval-page/WaitingApprovalPage';
import RegisterManagement from './registers-management/RegistersManagement';
import StudyMaterialContainer from './study-material/StudyMaterialContainer';
import UnauthorizedPage from './components/UnauthorizedPage';
import NoInternet from './components/NoInternet';
import SplashScreen from './components/SplashScreen';
import RejectionPage from './authentication/components/rejection-page/RejectionPage';
import UsersManagement from './users-management/UsersManagement';
import DocumentPage from './docs-handling/DocumentPage';

function App() {
  const isDev = process.env.NODE_ENV === '';
  const StudyMaterialRoutes = useStudyMaterialRoutes();

  const routeConfigurations = {
    authorizedRoutes: [
      {
        path: '/study-materials',
        element: <StudyMaterialContainer />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/events',
        element: <EventContainer />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/students-management',
        element: <StudentsManagement />,
        allowedRoles: [Role.Admin, Role.Owner],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/registers-management',
        element: <RegisterManagement />,
        allowedRoles: [Role.Admin, Role.Owner],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/users',
        element: <UsersManagement />,
        allowedRoles: [Role.Owner]
      },
      {
        path: '/register',
        element: <RegisterComponent />,
        allowedRoles: [Role.PreEnrollment],
        roleToComponentMap: {
          [Role.Pending]: <WaitApprovalPage />,
          [Role.Rejected]: <RejectionPage />
        }
      },
      {
        path: '/approvalPage',
        element: <WaitApprovalPage />,
        allowedRoles: [Role.Pending],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Rejected]: <RejectionPage />
        }
      },
      {
        path: '/',
        element: <Banner />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />,
          [Role.Rejected]: <RejectionPage />
        }
      },
      {
        path: '/documents',
        element: <DocumentPage />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />,
          [Role.Rejected]: <RejectionPage />
        }
      },
      {
        path: '/rejection',
        element: <RejectionPage />,
        allowedRoles: [Role.Rejected],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      }
    ],
    publicRoutes: [
      {
        path: '/splash',
        element: <SplashScreen />
      },
      {
        path: '/401',
        element: <UnauthorizedPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      },
      {
        path: '/unconnected-internet',
        element: <NoInternet />
      }
    ],
    devRoutes: [
      {
        path: '/gpt',
        element: <GPTPlayGround />
      }
    ]
  };

  return (
    <Routes>
      <Route path="/" element={isDev ? <TestingLayout /> : <Layout />}>
        {isDev &&
          routeConfigurations.devRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        {StudyMaterialRoutes}
        {routeConfigurations.authorizedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RoleBasedAccessControl allowedRoles={route.allowedRoles} roleToComponentMap={route.roleToComponentMap}>
                {route.element}
              </RoleBasedAccessControl>
            }
          />
        ))}
        {routeConfigurations.publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
