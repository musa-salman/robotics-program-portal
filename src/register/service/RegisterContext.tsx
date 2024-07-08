import { createContext } from 'react';
import { RegisterService } from './RegisterService';

export const RegisterContext = createContext<RegisterService>(undefined as unknown as RegisterService);

interface RegisterProviderProps {
  children: React.ReactNode;
  registerService: RegisterService;
}

function RegisterProvider({ children, registerService }: RegisterProviderProps): JSX.Element {
  return <RegisterContext.Provider value={registerService}>{children}</RegisterContext.Provider>;
}

export default RegisterProvider;
