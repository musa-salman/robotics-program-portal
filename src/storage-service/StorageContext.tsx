import { createContext, useContext } from 'react';
import { StorageService } from './StorageService';
import { IStorageService } from './IStorageService';

export const StorageServiceContext = createContext<IStorageService>(new StorageService());

function StorageProvider({ children }: { children: React.ReactNode }) {
  const storageService = useContext(StorageServiceContext);

  return <StorageServiceContext.Provider value={storageService}>{children}</StorageServiceContext.Provider>;
}

export default StorageProvider;
