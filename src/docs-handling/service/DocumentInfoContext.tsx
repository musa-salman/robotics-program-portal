import { createContext, useContext } from 'react';
import { IDocumentInfoService } from './DocumentService';

const DocumentInfoContext = createContext<IDocumentInfoService | undefined>(undefined);

interface DocumentProviderProps {
  children: React.ReactNode;
  documentService: IDocumentInfoService;
}

function DocumentProvider({ children, documentService }: DocumentProviderProps): JSX.Element {
  return <DocumentInfoContext.Provider value={documentService}>{children}</DocumentInfoContext.Provider>;
}

function useDocumentInfoService() {
  const documentInfoService = useContext(DocumentInfoContext);
  if (documentInfoService === undefined) {
    throw new Error('useDocumentInfoService must be used within a DocumentProvider');
  }
  return documentInfoService;
}

export { DocumentProvider, useDocumentInfoService };
