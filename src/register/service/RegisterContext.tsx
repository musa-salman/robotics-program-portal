import { createContext } from 'react';
import { RegisterService } from './RegisterService';

/**
 * The context for the RegisterService.
 */
export const RegisterContext = createContext<RegisterService>(undefined as unknown as RegisterService);

/**
 * Props for the RegisterProvider component.
 */
interface RegisterProviderProps {
  children: React.ReactNode;
  registerService: RegisterService;
}

/**
 * Registers a provider for the RegisterContext.
 *
 * @param children - The children components.
 * @param registerService - The register service.
 * @returns The JSX element.
 */
function RegisterProvider({ children, registerService }: RegisterProviderProps): JSX.Element {
  return <RegisterContext.Provider value={registerService}>{children}</RegisterContext.Provider>;
}

export default RegisterProvider;
