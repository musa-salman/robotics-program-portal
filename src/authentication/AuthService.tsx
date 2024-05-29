import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase';
import LoginFormValues from './ILoginFormValues';

setPersistence(auth, browserLocalPersistence);

const loginWithEmailAndPassword = async ({
  email,
  password
}: LoginFormValues) => {
  const result: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result;
};

const generatePasswordResetLink = async (email: string) => {
  sendPasswordResetEmail(auth, email);
};

const loginWithGoogle = async () => {
  const result: UserCredential = await signInWithPopup(
    auth,
    new GoogleAuthProvider()
  );
  return result;
};

const logout = async () => {
  await signOut(auth);
};

const AuthService = {
  loginWithEmailAndPassword: loginWithEmailAndPassword,
  generatePasswordResetLink: generatePasswordResetLink,
  loginWithGoogle: loginWithGoogle,
  logout: logout
};

export default AuthService;
