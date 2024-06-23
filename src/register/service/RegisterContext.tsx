import { createContext, useContext } from 'react';
import { RegisterService } from './RegisterService';

export const RegisterContext = createContext<RegisterService>(new RegisterService());

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const registerService = useContext(RegisterContext);

  return <RegisterContext.Provider value={registerService}>{children}</RegisterContext.Provider>;
}

export default RegisterProvider;
