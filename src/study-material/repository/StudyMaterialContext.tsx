import { createContext, useContext } from 'react';
import { MaterialService } from './MaterialService';

export const MaterialContext = createContext<MaterialService>(new MaterialService());

function MaterialProvider({ children }: { children: React.ReactNode }) {
  const materialService = useContext(MaterialContext);

  return <MaterialContext.Provider value={materialService}>{children}</MaterialContext.Provider>;
}

export default MaterialProvider;
