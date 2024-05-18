import React, { useContext, useEffect, useMemo, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LoginFormValues from "./ILoginFormValues";
import AuthService from "./AuthService";
import { useNavigate } from "react-router-dom";
import PageLoading from "../components/PageLoading";

export interface IAuth {
    user: User | null;  //type User comes from firebase
    loading: boolean;
    SignIn: (creds: LoginFormValues, onSuccess : () => void, onFailure : (reason: string) => void) => Promise<void>;
    LoginWithGoogle: (onSuccess: () => void, onFailure: (reason: string) => void) => Promise<void>;
    SignOut: (onFailure: (reason: string) => void) => Promise<void>;
}

export const AuthContext = React.createContext<IAuth>({
    user: auth.currentUser,
    loading: false,
    SignIn: async (_creds: LoginFormValues, _onSuccess: () => void, _onFailure: (reason: string) => void): Promise<void> => {},
    LoginWithGoogle: async (_onSuccess: () => void, _onFailure: (reason: string) => void): Promise<void> => {},
    SignOut: async (_onFailure: (reason: string) => void) => { },
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    //Sign in
    const SignIn = async (creds: LoginFormValues, onSuccess: () => void, onFailure: (reason: string) => void) => {
        setIsLoading(true);
        AuthService.SignIn(creds)
            .then(userCredential => {
                const { user } = userCredential;
                if (user) {
                    setCurrentUser(user);
                    onSuccess();
                }
                else {
                    setIsLoading(false);
                    onFailure("כניסה נכשלה, נסה שוב.");
                }
            }).catch(error => {
                if (error.code === 'auth/wrong-password') {
                    onFailure("סיסמה או מייל שגויים.");

                } else if (error.code === 'auth/too-many-requests') {
                    onFailure("ניסיונות כניסה רבים מדי, נסה שוב מאוחר יותר.");
                }
                else {
                    onFailure("כניסה נכשלה, נסה שוב.");
                }
                setIsLoading(false);
                
            });
    }

  const LoginWithGoogle = async (onSuccess: () => void, onFailure: (reason: string) => void) => {
    AuthService.SignInWithGoogle()
      .then(creds => {
        const { user } = creds;
        if (user) {
          setCurrentUser(user);
          onSuccess();
        } else {
            onFailure("כניסה נכשלה, נסה שוב.");
        }
      })
      .catch(error => {
            onFailure("כניסה נכשלה, נסה שוב.\n" + error.message);
      });
  };

    //Sign out
    const SignOut = async (onFailure: (reason: string) => void) => {
        setIsLoading(true);
        try {
            await AuthService.SignOut();
            setCurrentUser(null);
            navigate('/login', { replace: true });
        } catch (error) {
            setIsLoading(false);
            onFailure("התנתקות נכשלה, נסה שוב");   
        }
    };

    const authValues: IAuth = useMemo(
        () => ({
            user: currentUser,
            loading: isLoading,
            SignIn,
            LoginWithGoogle,
            SignOut
        }),
        [currentUser, isLoading, SignIn, LoginWithGoogle, SignOut]
    );

    useEffect(() => {
        //onAuthStateChanged check if the user is still logged in or not
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setIsAuthLoading(false);
        });
        return unsubscribe;
    }, []);

    //If loading for the first time when visiting the page
    if (isAuthLoading) return <PageLoading />;

    return (
        <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;