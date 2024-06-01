import { Navigate } from 'react-router-dom';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { UserContext } from '../users/UserContext';
import { auth } from '../firebase';
import { useAuth } from './useAuth';

/**
 * Represents the authorization status for a user.
 */
enum AuthorizationStatus {
  UnauthorizedAuthenticatedUser = 1,
  UnauthorizeUnauthenticatedUser,
  AuthorizedUser
}

/**
 * Props for the RoleBasedAccessControl component.
 */
type RoleBasedAccessControlProps = {
  children: ReactNode;
  unauthorizedUnauthenticatedComponent?: ReactNode;
  unauthorizedAuthenticatedComponent?: ReactNode;
  loadingComponent?: ReactNode;
  allowedRoles: string[];
};

/**
 * RoleBasedAccessControl component provides role-based access control functionality.
 *
 * @component
 * @example
 * ```tsx
 * <RoleBasedAccessControl
 *   allowedRoles={['admin', 'manager']}
 *   unauthorizedAuthenticatedComponent={<UnauthorizedAuthenticatedComponent />}
 *   unauthorizedUnauthenticatedComponent={<UnauthorizedUnauthenticatedComponent />}
 *   loadingComponent={<LoadingComponent />}
 * >
 *   <AuthorizedComponent />
 * </RoleBasedAccessControl>
 * ```
 */
const RoleBasedAccessControl: React.FC<RoleBasedAccessControlProps> = ({
  children,
  allowedRoles,
  unauthorizedAuthenticatedComponent,
  unauthorizedUnauthenticatedComponent,
  loadingComponent
}) => {
  const userRepository = useContext(UserContext);
  const [authorization, setAuthorization] = useState<AuthorizationStatus | null>(null);

  const { loading } = useAuth();

  useEffect(() => {
    const checkUserAuthorization = async () => {
      if (auth.currentUser !== null) {
        const userRole = await userRepository.getUserRole(auth.currentUser.uid);
        if (allowedRoles.includes(userRole)) {
          setAuthorization(AuthorizationStatus.AuthorizedUser);
        } else {
          setAuthorization(AuthorizationStatus.UnauthorizedAuthenticatedUser);
        }
      } else {
        setAuthorization(AuthorizationStatus.UnauthorizeUnauthenticatedUser);
      }
    };

    if (!loading && authorization === null) {
      checkUserAuthorization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, allowedRoles]);

  if (loading) {
    return loadingComponent ? loadingComponent : <span className="loading loading-dots loading-lg"></span>;
  }

  if (authorization === AuthorizationStatus.AuthorizedUser) {
    return children;
  } else if (authorization === AuthorizationStatus.UnauthorizeUnauthenticatedUser) {
    return unauthorizedAuthenticatedComponent ? unauthorizedAuthenticatedComponent : <Navigate to="/login" />;
  } else if (authorization === AuthorizationStatus.UnauthorizedAuthenticatedUser) {
    return unauthorizedUnauthenticatedComponent ? unauthorizedUnauthenticatedComponent : <Navigate to="/" />;
  }

  return <></>;
};

export default RoleBasedAccessControl;
