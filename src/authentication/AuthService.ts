import {
  GoogleAuthProvider,
  UserCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import LoginFormValues from './ILoginFormValues';
import { IAuthService } from './IAuthService';

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
    return sendPasswordResetEmail(auth, email);
  }
}
