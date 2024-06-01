import { Route } from 'react-router-dom';
import Login from './Login';
import ForgetPassword from './ForgetPassword';

/**
 * Custom hook that returns the authentication routes.
 * @returns The authentication routes.
 */
export const useAuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </>
  );
};
