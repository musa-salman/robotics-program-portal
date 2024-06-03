import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../services/useAuth';
import { ALLOW_AUTHED_ROLES } from './Roles';

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
  const [authorization, setAuthorization] = useState<AuthorizationStatus | null>(null);

  const { user, loading } = useAuth();

  useEffect(() => {
    const checkUserAuthorization = async () => {
      if (user !== null) {
        if (allowedRoles === ALLOW_AUTHED_ROLES) {
          setAuthorization(AuthorizationStatus.AuthorizedUser);
          return;
        }

        if (allowedRoles.includes(user?.role || '')) {
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
  }, [user, loading, allowedRoles]);

  if (loading) {
    return loadingComponent ? loadingComponent : <span className="loading loading-dots loading-lg"></span>;
  }

  if (authorization === AuthorizationStatus.AuthorizedUser) {
    return children;
  } else if (authorization === AuthorizationStatus.UnauthorizeUnauthenticatedUser) {
    return unauthorizedUnauthenticatedComponent ? unauthorizedUnauthenticatedComponent : <Navigate to="/" />;
  } else if (authorization === AuthorizationStatus.UnauthorizedAuthenticatedUser) {
    return unauthorizedAuthenticatedComponent ? unauthorizedAuthenticatedComponent : <Navigate to="/login" />;
  }

  return <></>;
};

export default RoleBasedAccessControl;
