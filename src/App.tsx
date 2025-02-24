import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/components/RoleBasedAccessControl';
import EventContainer from './events/EventContainerShowALL';
import Layout from './components/layout/Layout';
import Role from './authentication/components/Roles';
import Banner from './components/Banner';
import NotFoundPage from './components/NotFoundPage';
import RegisterComponent from './register/RegisterComponent';
import WaitApprovalPage from './authentication/components/wait-approval-page/WaitingApprovalPage';
import RegisterManagement from './registers-management/RegistersManagement';
import StudyMaterialContainer from './study-material/StudyMaterialContainer';
import UnauthorizedPage from './components/UnauthorizedPage';
import NoInternet from './components/NoInternet';
import SplashScreen from './components/SplashScreen';
import RejectionPage from './authentication/components/rejection-page/RejectionPage';
import UsersManagement from './users-management/UsersManagement';
import DocumentPage from './docs-handling/DocumentPage';
import PageContainer from './components/PageContainer';
import InsightPage from './insights/InsightPage';
import Management from './students-management/Management';
import SettingsPage from './settings/SettingsPage';

function App() {
  const routeConfigurations = {
    authorizedRoutes: [
      {
        path: '/settings',
        element: <SettingsPage />,
        allowedRoles: [Role.Owner],
        title: 'הגדרות'
      },
      {
        path: '/study-materials',
        element: <StudyMaterialContainer />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        title: 'חומרי למידה',
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/deep-inspection',
        element: <InsightPage />,
        allowedRoles: [Role.Admin, Role.Owner],
        title: 'בחינה מעמיקה'
      },
      {
        path: '/events',
        element: <EventContainer />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        title: 'אירועים',
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/students-management',
        element: <Management />,
        allowedRoles: [Role.Admin, Role.Owner],
        title: 'ניהול משתמשים',
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/registers-management',
        element: <RegisterManagement />,
        allowedRoles: [Role.Admin, Role.Owner],
        title: 'ניהול נרשמים',
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
        }
      },
      {
        path: '/users',
        element: <UsersManagement />,
        allowedRoles: [Role.Owner],
        title: 'ניהול משתמשים'
      },
      {
        path: '/register',
        element: <RegisterComponent />,
        allowedRoles: [Role.PreEnrollment],
        title: 'הרשמה מגמה העל איזורית ברובוטיקה מכטרוניקה',
        roleToComponentMap: {
          [Role.Pending]: <WaitApprovalPage />,
          [Role.Rejected]: <RejectionPage />
        }
      },
      {
        path: '/approvalPage',
        element: <WaitApprovalPage />,
        allowedRoles: [Role.Pending],
        title: 'ממתין לאישור',
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Rejected]: <RejectionPage />,
          [Role.Student]: <Banner />
        }
      },
      {
        path: '/',
        element: <Banner />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />,
          [Role.Rejected]: <RejectionPage />,
          [Role.Unauthenticated]: <SplashScreen />
        }
      },
      {
        path: '/documents',
        element: <DocumentPage />,
        allowedRoles: [Role.Admin, Role.Owner, Role.Student],
        title: 'מסמכים',
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
        title: 'הרשמה נדחתה',
        roleToComponentMap: {
          [Role.PreEnrollment]: <RegisterComponent />,
          [Role.Pending]: <WaitApprovalPage />
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
      },
      {
        path: '/unconnected-internet',
        element: <NoInternet />
      }
    ]
  };

  return (
    <Routes>
      <Route
        path="/splash"
        element={
          <RoleBasedAccessControl
            allowedRoles={[Role.Unauthenticated]}
            roleToComponentMap={{
              [Role.PreEnrollment]: <Navigate to="/register" />,
              [Role.Pending]: <Navigate to="/approvalPage" />,
              [Role.Rejected]: <Navigate to="/rejection" />,
              [Role.Student]: <Navigate to="/" />,
              [Role.Admin]: <Navigate to="/" />,
              [Role.Owner]: <Navigate to="/" />
            }}>
            <SplashScreen />
          </RoleBasedAccessControl>
        }
      />
      <Route path="/" element={<Layout />}>
        {routeConfigurations.authorizedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RoleBasedAccessControl allowedRoles={route.allowedRoles} roleToComponentMap={route.roleToComponentMap}>
                {route.title ? <PageContainer title={route.title}> {route.element} </PageContainer> : route.element}
              </RoleBasedAccessControl>
            }
          />
        ))}
        {routeConfigurations.publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
