import { UserCredential } from 'firebase/auth';
import LoginFormValues from './ILoginFormValues';

export interface IAuthService {
  loginWithEmailAndPassword: (
    creds: LoginFormValues
  ) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  generatePasswordResetLink: (email: string) => Promise<void>;
}
