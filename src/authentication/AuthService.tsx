import { signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, UserCredential, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase";
import LoginFormValues from './ILoginFormValues';

setPersistence(auth, browserLocalPersistence);

const SignIn = async ({ email, password }: LoginFormValues) => {
    const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return result;
};

const SignInWithGoogle = async () => {
    const result: UserCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    return result;
}

const SignOut = async () => {
    await signOut(auth);
};

const AuthService = {
    login: SignIn,
    loginWithGoogle: SignInWithGoogle,
    logout: SignOut
};

export default AuthService;