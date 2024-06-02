import { createContext, useContext } from 'react';
import { UserRepository } from './UserRepository';

/**
 * Context object for managing user data.
 * @type {React.Context<UserRepository>}
 */
export const UserContext = createContext<UserRepository>(new UserRepository());

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
