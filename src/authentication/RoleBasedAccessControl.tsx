import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getUserRole } from "./UsersRepository";
import { useEffect, useState } from "react";
import React from "react";

enum AuthorizationStatus {
  UnauthorizedAuthenticatedUser = 1,
  UnauthorizeUnauthenticatedUser,
  AuthorizedUser
}

type RoleBasedAccessControlProps = {
  children: React.ReactNode;
  unauthorizedUnauthenticatedComponent?: React.ReactNode;
  unauthorizedAuthenticatedComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  allowedRoles: string[];
};

const RoleBasedAccessControl: React.FC<RoleBasedAccessControlProps> = ({
  children, allowedRoles,
  unauthorizedAuthenticatedComponent, unauthorizedUnauthenticatedComponent,
  loadingComponent
}) => {
  const { user, loading } = useAuth();
  const [authorization, setAuthorization] = useState<AuthorizationStatus | null>(null);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      if (user) {
        const userRole = await getUserRole(user.uid);
        if (allowedRoles.includes(userRole)) {
          setAuthorization(AuthorizationStatus.AuthorizedUser)
        } else {
          setAuthorization(AuthorizationStatus.UnauthorizedAuthenticatedUser);
        }
      } else {
        setAuthorization(AuthorizationStatus.UnauthorizeUnauthenticatedUser);
      }
    }

    if (!loading && authorization === null) {
      checkUserAuthorization();
    }
  }, [user, loading, allowedRoles]);

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
}

export default RoleBasedAccessControl;