import { createContext, useContext } from 'react';
import { UserRepository } from './UserRepository';

export const UserContext = createContext<UserRepository>(new UserRepository());

function UserProvider({ children }: { children: React.ReactNode }) {
  const userRepository = useContext(UserContext);

  return (
    <UserContext.Provider value={userRepository}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
