import { UserCredential } from 'firebase/auth';

/**
 * Represents an authentication service.
 */
export interface IAuthService {
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
}
