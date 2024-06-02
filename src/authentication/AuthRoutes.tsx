import { Route } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import ForgetPasswordContainer from './ForgetPasswordContainer';

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
