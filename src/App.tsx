import './App.css'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Link, Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/RoleBasedAccessControl';
<<<<<<< HEAD
import { useAuthRoutes } from './authentication/AuthRoutes';
import { useStudyMaterialRoutes } from './study-material/StudyMaterialRoutes';
import EventContainer from './events/EventContainer';
import { SearchBar } from './study-material/SearchBar';
import StudyMaterialContainer from './study-material/StudyMaterialContainer';
=======
import ForgetPassword from './forget-password/ForgetPassword';
import UploadFileComponent from './upload-file/UploadFile';
//mport EventContainerShow from './events/EventContainer';
import StudyMaterialContainer from './study-material/StudyMaterialContainer';
//import { Container } from 'react-bootstrap';
import { SearchBar } from './study-material/SearchBar';
>>>>>>> 062d1a0dc50f5fee446119ec778c74f827ddeff0

function App() {
  const AuthRoutes = useAuthRoutes();
  const StudyMaterialRoutes = useStudyMaterialRoutes();

  return (
    <>
      <><div>
        <h1>Home Page</h1>
      </div><div>
          <Link to="/"> Home </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/forget-password">
            <button>Forget Password</button>
          </Link>
          <Link to="/study-material">
            <button>Study Material</button>
          </Link>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
          <Link to="/study-material-upload">
            <button>Upload Study Material</button>
          </Link>
          <Link to="/events">
            <button>Events</button>
          </Link>
        </div></>
      {/* <EventContainerShow eventsProps={[]} /> */}
      
      <SearchBar/>
      <br/>
      <StudyMaterialContainer/>
      <br/>

      <Routes>
        <Route path="/" element={<div>Home</div>} />

        {AuthRoutes}
        {StudyMaterialRoutes}
        <Route path="/events" element={<EventContainer />} />
        <Route path="/dashboard" element={
          <RoleBasedAccessControl allowedRoles={['admin']}>
            <div>Dashboard</div>
          </RoleBasedAccessControl>
        } />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  )
}

export default App