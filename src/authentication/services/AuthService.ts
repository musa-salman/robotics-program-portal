import { GoogleAuthProvider, UserCredential, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { IAuthService } from './IAuthService';

/**
 * Service responsible for handling authentication operations.
 */
export class AuthService implements IAuthService {
  async loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    return signOut(auth);
  }
}
