import { useContext } from 'react';
import { IUserService } from './UserService';
import { UserContext } from './UserContext';

/**
 * Custom hook that provides the user service from the UserContext.
 * @returns The user service from the UserContext.
 * @throws {Error} If used outside of a UserProvider.
 */
function useUserService(): IUserService {
  const userService = useContext(UserContext);
  if (!userService) {
    throw new Error('useUserService must be used within a UserProvider');
  }
  return userService;
}

export { useUserService };
