import { createContext, useContext } from 'react';
import { IDocumentInfoService } from './IDocumentInfoService';

/**
 * Context for managing document information.
 */
const DocumentInfoContext = createContext<IDocumentInfoService | undefined>(undefined);

/**
 * Props for the DocumentProvider component.
 */
interface DocumentProviderProps {
  children: React.ReactNode;
  documentService: IDocumentInfoService;
}

/**
 * Provides the document service to the children components.
 *
 * @param children - The child components that will have access to the document service.
 * @param documentService - The document service to be provided.
 * @returns The JSX element representing the document provider.
 */
function DocumentProvider({ children, documentService }: DocumentProviderProps): JSX.Element {
  return <DocumentInfoContext.Provider value={documentService}>{children}</DocumentInfoContext.Provider>;
}

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

export { DocumentProvider, useDocumentInfoService };
