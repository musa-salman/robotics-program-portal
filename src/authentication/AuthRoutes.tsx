import { Route } from 'react-router-dom';
import Login from './Login';
import ForgetPassword from './ForgetPassword';

export const useAuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </>
  );
};
