import { createContext, useContext } from 'react';
import { RegisterRepository } from './RegisterRepository';

export const RegisterContext = createContext<RegisterRepository>(new RegisterRepository());

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const studyMaterialRepository = useContext(RegisterContext);

  return <RegisterContext.Provider value={studyMaterialRepository}>{children}</RegisterContext.Provider>;
}

export default RegisterProvider;
