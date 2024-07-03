import { createContext, useContext } from 'react';
import { DocumentRepository } from './DocumentRepository';

const DocumentInfoContext = createContext<DocumentRepository | undefined>(undefined);

interface DocumentProviderProps {
  children: React.ReactNode;
  documentRepository: DocumentRepository;
}

function DocumentProvider({ children, documentRepository }: DocumentProviderProps): JSX.Element {
  return <DocumentInfoContext.Provider value={documentRepository}>{children}</DocumentInfoContext.Provider>;
}

function useDocumentInfo() {
  const documentRepository = useContext(DocumentInfoContext);
  if (documentRepository === undefined) {
    throw new Error('useDocumentInfo must be used within a DocumentProvider');
  }
  return documentRepository;
}

export { DocumentProvider, useDocumentInfo };
