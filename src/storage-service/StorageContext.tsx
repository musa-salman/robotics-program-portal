import { createContext, useContext } from 'react';
import { StorageService } from './StorageService';
import { IStorageService } from './IStorageService';

/**
 * The context for the storage service.
 */
export const StorageServiceContext = createContext<IStorageService>(new StorageService());

/**
 * Provides a context for accessing the storage service.
 *
 * @param children - The children components to be wrapped by the storage provider.
 */
function StorageProvider({ children }: { children: React.ReactNode }) {
  const storageService = useContext(StorageServiceContext);

  return <StorageServiceContext.Provider value={storageService}>{children}</StorageServiceContext.Provider>;
}

export default StorageProvider;
