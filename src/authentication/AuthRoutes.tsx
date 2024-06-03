import { Route } from 'react-router-dom';
import LoginContainer from './components/Login/LoginContainer';
import ForgetPasswordContainer from './components/ForgetPassword/ForgetPasswordContainer';

/**
 * Custom hook that returns the authentication routes.
 * @returns The authentication routes.
 */
export const useAuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/forget-password" element={<ForgetPasswordContainer />} />
    </>
  );
};
