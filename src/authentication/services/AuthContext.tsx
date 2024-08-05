import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IAuthService } from './IAuthService';
import { browserLocalPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthService } from './AuthService';
import { User } from '../../users/User';
import { useUserService } from '../../users/UserContext';
import Role from '../components/Roles';

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
function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const authService = useContext(AuthContext);
  const userRepository = useUserService().getUserRepository();

  const authContextValue: AuthContextType = useMemo(
    () => ({
      user: user,
      loading: loading,
      authService: authService.authService
    }),
    [user, loading, authService]
  );

  useEffect(() => {
    function getUser() {
      if (auth.currentUser === null) {
        setUser(null);
        setLoading(false);
        return;
      }
      userRepository.findOne(auth.currentUser.uid).then((user) => {
        if (!user) {
          user = {
            id: auth.currentUser!.uid,
            roles: [Role.PreEnrollment],
            email: auth.currentUser!.email!
          };

          userRepository.createWithId(user.id, user).then(() => {
            setUser(user);
            setLoading(false);
          });
        } else {
          user.roles = user.roles.sort((a, b) => a - b);
          setUser(user);
          setLoading(false);
        }
      });
    }

    const unsubscribe = onAuthStateChanged(auth, () => {
      getUser();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
