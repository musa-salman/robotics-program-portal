import './App.css'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Login from './login/Login';
import { Route, Routes } from 'react-router-dom';
import RoleBasedAccessControl from './authentication/RoleBasedAccessControl';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        <Route path="/about" element={
          <><RoleBasedAccessControl allowedRoles={['admin']} unauthorizedAuthenticatedComponent={<></>} unauthorizedUnauthenticatedComponent={<></>}>
            <div>only admin see this</div>
          </RoleBasedAccessControl><>
            </>Everyone see this</>
        
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <RoleBasedAccessControl allowedRoles={['admin']}>
            <div>Dashboard</div>
          </RoleBasedAccessControl>
        } />
      </Routes>
    </>
  )
}

export default App
