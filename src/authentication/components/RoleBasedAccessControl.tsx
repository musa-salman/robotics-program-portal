import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../services/useAuth';
import Role, { ALLOW_AUTHED_ROLES } from './Roles';

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
  allowedRoles: Role[];
  roleToComponentMap?: { [key: string]: ReactNode };
};

/**
 * RoleBasedAccessControl component is responsible for rendering different components based on user roles and authorization status.
 *
 * @component
 * @example
 * ```tsx
 * <RoleBasedAccessControl
 *   allowedRoles={[Role.Admin, Role.Owner]}
 *   unauthorizedAuthenticatedComponent={<UnauthorizedAuthenticatedComponent />}
 *   unauthorizedUnauthenticatedComponent={<UnauthorizedUnauthenticatedComponent />}
 *   loadingComponent={<LoadingComponent />}
 *   roleToComponentMap={{
 *     admin: <AdminComponent />,
 *     manager: <ManagerComponent />,
 *   }}
 * >
 *   <AuthorizedComponent />
 * </RoleBasedAccessControl>
 * ```
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The component to render if the user is authorized.
 * @param {string[]} props.allowedRoles - The roles that are allowed to access the component.
 * @param {React.ReactNode} [props.unauthorizedAuthenticatedComponent] - The component to render if the user is authenticated but not authorized.
 * @param {React.ReactNode} [props.unauthorizedUnauthenticatedComponent] - The component to render if the user is unauthenticated.
 * @param {React.ReactNode} [props.loadingComponent] - The component to render while the authorization status is being determined.
 * @param {Object} [props.roleToComponentMap] - The mapping of roles to components to render for each role.
 * @returns {React.ReactNode} The rendered component based on the user's role and authorization status.
 */
const RoleBasedAccessControl: React.FC<RoleBasedAccessControlProps> = ({
  children,
  allowedRoles,
  unauthorizedAuthenticatedComponent,
  unauthorizedUnauthenticatedComponent,
  loadingComponent,
  roleToComponentMap
}) => {
  const [authorization, setAuthorization] = useState<AuthorizationStatus | null>(null);

  const { user, loading } = useAuth();

  useEffect(() => {
    const checkUserAuthorization = () => {
      if (user !== null) {
        if (allowedRoles === ALLOW_AUTHED_ROLES) {
          setAuthorization(AuthorizationStatus.AuthorizedUser);
          return;
        }
        if (allowedRoles.includes((user?.role as Role) || Role.Unauthenticated)) {
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
    return unauthorizedUnauthenticatedComponent ? unauthorizedUnauthenticatedComponent : <Navigate to="/login" />;
  } else if (authorization === AuthorizationStatus.UnauthorizedAuthenticatedUser) {
    if (roleToComponentMap && user?.role && roleToComponentMap[user.role]) {
      return roleToComponentMap[user.role];
    }

    return unauthorizedAuthenticatedComponent ? unauthorizedAuthenticatedComponent : <Navigate to="/" />;
  }

  return <></>;
};

export default RoleBasedAccessControl;
