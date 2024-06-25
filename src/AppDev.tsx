import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Route, Routes } from 'react-router-dom';
import { useAuthRoutes } from './authentication/AuthRoutes';
import { useStudyMaterialRoutes } from './study-material/StudyMaterialRoutes';
import EventContainer from './events/EventContainer';
import Layout from './components/layout/Layout';
import TestingLayout from './components/layout/TestingLayout';
import Banner from './components/Banner';
import StudentsManagement from './students-management/StudentsManagement';
import NotFoundPage from './components/NotFoundPage';
import RegisterComponent from './register/RegisterComponent';
import GPTPlayGround from './gpt-service/GPTPlayGround';
import WaitApprovalPage from './wait-approval-page/WaitingApprovalPage';
import RegisterManagement from './registers-management/RegistersManagement';
import UnauthorizedPage from './components/UnauthorizedPage';
import NoInternet from './components/NoInternet';

function AppDev() {
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

            <Route path="/register" element={<RegisterComponent />} />

            <Route path="/approvalPage" element={<WaitApprovalPage />} />

            <Route path="/students" element={<StudentsManagement />} />
            <Route path="/registers" element={<RegisterManagement />} />

            <Route path="/gpt" element={<GPTPlayGround />} />

            <Route path="unconnected-internet" element={<NoInternet />} />

            <Route path="/401" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppDev;
