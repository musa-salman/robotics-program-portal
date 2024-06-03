import {
  GoogleAuthProvider,
  UserCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from '../../firebase';
import LoginFormValues from '../components/Login/ILoginFormValues';
import { IAuthService } from './IAuthService';

/**
 * Service responsible for handling authentication operations.
 */
export class AuthService implements IAuthService {
  async loginWithEmailAndPassword(creds: LoginFormValues): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, creds.email, creds.password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    return signOut(auth);
  }

  async generatePasswordResetLink(email: string): Promise<void> {
    const actionCodeSettings = {
      url: import.meta.env.VITE_REACT_APP_PASSWORD_RESET_REDIRECT,
      handleCodeInApp: true
    };

    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  }
}
