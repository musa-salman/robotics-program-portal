import { createContext, useContext } from 'react';
import { StorageService } from './StorageService';

export const StorageServiceContext = createContext<StorageService>(new StorageService());

function StorageServiceProvider({ children } : { children: React.ReactNode }) {
  const storageService = useContext(StorageServiceContext);

  return (
    <StorageServiceContext.Provider value={storageService}>
      {children}
    </StorageServiceContext.Provider>
  );
}

export default StorageServiceProvider;