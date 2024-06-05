import { UserCredential } from 'firebase/auth';
import LoginFormValues from '../components/Login/ILoginFormValues';

/**
 * Represents an authentication service.
 */
export interface IAuthService {
  /**
   * Logs in a user with email and password.
   * @param creds - The login form values.
   * @returns A promise that resolves to the user credential.
   */
  loginWithEmailAndPassword: (creds: LoginFormValues) => Promise<UserCredential>;

  /**
   * Logs in a user with Google.
   * @returns A promise that resolves to the user credential.
   */
  loginWithGoogle: () => Promise<UserCredential>;

  /**
   * Logs out the current user.
   * @returns A promise that resolves when the user is logged out.
   */
  logout: () => Promise<void>;

  /**
   * Generates a password reset link for the given email.
   * @param email - The user's email.
   * @returns A promise that resolves when the password reset link is generated.
   */
  generatePasswordResetLink: (email: string) => Promise<void>;
}
