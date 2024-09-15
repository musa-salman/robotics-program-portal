import { useContext } from 'react';
import { DocumentInfoContext } from './DocumentInfoContext';

/**
 * Custom hook that provides access to the DocumentInfoService.
 *
 * @returns The DocumentInfoService instance.
 * @throws {Error} If used outside of a DocumentProvider.
 */
function useDocumentInfoService() {
  const documentInfoService = useContext(DocumentInfoContext);
  if (documentInfoService === undefined) {
    throw new Error('useDocumentInfoService must be used within a DocumentProvider');
  }
  return documentInfoService;
}

export { useDocumentInfoService };
