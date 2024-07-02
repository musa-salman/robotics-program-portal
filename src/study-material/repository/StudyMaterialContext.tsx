import { createContext, useContext } from 'react';
import { MaterialService } from './MaterialService';

export const MaterialContext = createContext<MaterialService>(undefined as unknown as MaterialService);

interface MaterialProviderProps {
  children: React.ReactNode;
  materialService: MaterialService;
}

function MaterialProvider({ children }: MaterialProviderProps): JSX.Element {
  const materialService = useContext(MaterialContext);

  return <MaterialContext.Provider value={materialService}>{children}</MaterialContext.Provider>;
}

export default MaterialProvider;
