import { createContext } from 'react';
import { UserRepository } from './UsersRepository';

export const UserContext = createContext<UserRepository | null>(null);

function UserProvider({ children } : { children: React.ReactNode }) {
  const userRepository = new UserRepository();

  return (
    <UserContext.Provider value={userRepository}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;