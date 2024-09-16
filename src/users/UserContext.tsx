import { createContext } from 'react';
import { IUserService } from './UserService';

/**
 * Context object for managing user-related data and services.
 * @type {React.Context<IUserService | undefined>}
 */
const UserContext: React.Context<IUserService | undefined> = createContext<IUserService | undefined>(undefined);

/**
 * IUserProviderProps interface represents the props required for the UserProvider component.
 * @template T - The type of the user service.
 * @property {React.ReactNode} children - The children components.
 * @property {T} userService - The user service.
 */
interface IUserProviderProps {
  children: React.ReactNode;
  userService: IUserService;
}

/**
 * Provides the user repository to the component tree.
 *
 * @param children - The child components to be wrapped by the UserProvider.
 * @returns The UserProvider component.
 */
function UserProvider({ children, userService }: IUserProviderProps): JSX.Element {
  return <UserContext.Provider value={userService}>{children}</UserContext.Provider>;
}

export default UserProvider;
export { UserContext };
