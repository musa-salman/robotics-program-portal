import { createContext, useContext } from 'react';
import { MaterialService } from './MaterialService';

/**
 * Context for managing study material.
 */
const MaterialContext = createContext<MaterialService | undefined>(undefined);

interface MaterialProviderProps {
  children: React.ReactNode;
  materialService: MaterialService;
}

/**
 * Provides the study material context for the application.
 *
 * @param children - The child components to render within the context.
 * @param materialService - The service used to manage study materials.
 * @returns The study material provider component.
 */
function MaterialProvider({ children, materialService }: MaterialProviderProps) {
  return <MaterialContext.Provider value={materialService}>{children}</MaterialContext.Provider>;
}

/**
 * Custom hook that provides access to the MaterialContext.
 * @returns The material service from the MaterialContext.
 * @throws {Error} If used outside of a MaterialProvider.
 */
function useMaterialService() {
  const materialService = useContext(MaterialContext);
  if (materialService === undefined) {
    throw new Error('useMaterialService must be used within a MaterialProvider');
  }
  return materialService;
}

export default MaterialProvider;
export { useMaterialService };
