import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IAuthService } from './services/IAuthService';
import { User, browserLocalPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthService } from './services/AuthService';

setPersistence(auth, browserLocalPersistence);

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  authService: IAuthService;
}

/**
 * Context object for authentication.
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authService: new AuthService()
});

/**
 * Provides authentication context to its children components.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the AuthProvider.
 * @returns {JSX.Element} The AuthProvider component.
 */
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const authService = useContext(AuthContext);

  const authContextValue: AuthContextType = useMemo(
    () => ({
      user: user,
      loading: loading,
      authService: authService.authService
    }),
    [loading, authService]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setUser(auth.currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [loading]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
