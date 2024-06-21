import { createContext, useContext } from 'react';
import { MaterialManager } from './MaterialManager';

export const MaterialContext = createContext<MaterialManager>(new MaterialManager());

function MaterialProvider({ children }: { children: React.ReactNode }) {
  const materialRepository = useContext(MaterialContext);

  return <MaterialContext.Provider value={materialRepository}>{children}</MaterialContext.Provider>;
}

export default MaterialProvider;
