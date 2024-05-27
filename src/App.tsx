import './App.css'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Login from './login/Login';
import { Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/RoleBasedAccessControl';
import ForgetPassword from './forget-password/ForgetPassword';
import UploadFileComponent from './upload-file/UploadFile';
//mport EventContainerShow from './events/EventContainer';
import StudyMaterialContainer from './study-material/StudyMaterialContainer';
//import { Container } from 'react-bootstrap';


function App() {
  return (
    <>
      {/* <EventContainerShow eventsProps={[]} /> */}
      
      <StudyMaterialContainer/>
      <br/>

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={
          <><RoleBasedAccessControl allowedRoles={['admin']} unauthorizedAuthenticatedComponent={<></>} unauthorizedUnauthenticatedComponent={<></>}>
            <div>only admin see this</div>
          </RoleBasedAccessControl><>
            </>Everyone see this</>
        } />
        <Route path="/login" element={<Login />} />

        <Route path="/study-material" element={<UploadFileComponent  />} />

        <Route path="/dashboard" element={
          <RoleBasedAccessControl allowedRoles={['admin']}>
            <div>Dashboard</div>
          </RoleBasedAccessControl>
        } />
        <Route path="/forget-password" element={<ForgetPassword/>} />
      </Routes>
    </>


  )
}

export default App