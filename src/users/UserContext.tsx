import { createContext, useContext } from 'react';
import { UserRepository } from './UserRepository';
import { CachingRepository } from '../repositories/caching/CachingRepository';

/**
 * Context object for managing user data.
 * @type {React.Context<UserRepository>}
 */
export const UserContext: React.Context<UserRepository> = createContext<UserRepository>(
  new CachingRepository(new UserRepository())
);

/**
 * Provides the user repository to the component tree.
 *
 * @param children - The child components to be wrapped by the UserProvider.
 * @returns The UserProvider component.
 */
function UserProvider({ children }: { children: React.ReactNode }) {
  const userRepository = useContext(UserContext);

  return <UserContext.Provider value={userRepository}>{children}</UserContext.Provider>;
}

export default UserProvider;
