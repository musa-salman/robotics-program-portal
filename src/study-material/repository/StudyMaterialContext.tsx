import { createContext, useContext } from 'react';
import { MaterialService } from './MaterialService';

const MaterialContext = createContext<MaterialService | undefined>(undefined);

interface MaterialProviderProps {
  children: React.ReactNode;
  materialService: MaterialService;
}

function MaterialProvider({ children, materialService }: MaterialProviderProps) {
  return <MaterialContext.Provider value={materialService}>{children}</MaterialContext.Provider>;
}

function useMaterialService() {
  const materialService = useContext(MaterialContext);
  if (materialService === undefined) {
    throw new Error('useMaterialService must be used within a MaterialProvider');
  }
  return materialService;
}

export default MaterialProvider;
export { useMaterialService };
