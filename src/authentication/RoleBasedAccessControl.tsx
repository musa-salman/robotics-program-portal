import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { UserContext } from '../users/UserContext';
import { useAuth } from './AuthContext';
import { auth } from '../firebase';

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
  }, [auth.currentUser, loading, allowedRoles]);

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
