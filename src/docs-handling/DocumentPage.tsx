import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import DocumentCard from './DocumentCard';
import AddIcon from '@mui/icons-material/Add';
import DocumentFormModal from './DocumentForm';
import { AuthContext } from '../authentication/services/AuthContext';
import { DocumentInfo } from './service/DocumentInfo';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';
import Role from '../authentication/components/Roles';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import { SearchBar } from './searchBar';
import { useDocumentInfoService } from './service/useDocumentInfoService';

/**
 * Represents a page component for managing documents.
 *
 * @component
 * @example
 * ```tsx
 * <DocumentsPage />
 * ```
 */
const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentInfo[] | undefined>(undefined);

  const [filteredDocuments, setFilteredDocuments] = useState<DocumentInfo[]>([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const documentInfoService = useDocumentInfoService();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!documentInfoService) {
      return;
    }

    documentInfoService
      .getDocumentRepository()
      .find()
      .then((docs) => {
        setDocuments(docs);
        setFilteredDocuments(docs);
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בטעינת המסמכים', variant: 'error' });
      });
  }, [documentInfoService]);

  useEffect(() => {
    if (documents) {
      let filtered = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));

      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

      setFilteredDocuments(filtered);
    }
  }, [searchQuery, documents]);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleDocumentAdd = (document: DocumentInfo, file?: File | undefined): Promise<void> => {
    if (!documentInfoService) {
      return Promise.resolve();
    }

    if (!file) {
      return Promise.resolve();
    }

    return documentInfoService
      .addDocument(document, file)
      .then((docRef) => {
        document.id = docRef.id;
        setDocuments((prevDocs) => {
          if (!prevDocs) return [];
          return [...prevDocs, document];
        });
        showMessage({ message: 'המסמך נוסף בהצלחה', variant: 'success' });
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בהוספת המסמך', variant: 'error' });
      });
  };

  const handleDocumentDelete = (documentId: string) => {
    if (!documentInfoService) {
      return;
    }

    documentInfoService
      .deleteDocument(documentId)
      .then(() => {
        setDocuments((prevDocs) => {
          if (!prevDocs) return [];
          return prevDocs.filter((doc) => doc.id !== documentId);
        });
        showMessage({ message: 'המסמך נמחק בהצלחה', variant: 'success' });
      })
      .catch(() => {
        showMessage({ message: 'התרחשה שגיאה במחיקת המסמך, נסה שוב מאוחר יותר', variant: 'error' });
      });
  };

  const handleDocumentUpdate = (document: DocumentInfo, file?: File) => {
    if (!documentInfoService) {
      return Promise.resolve();
    }

    const id = document.id.toString();
    return documentInfoService
      .updateDocument(document, file)
      .then(() => {
        document.id = id;
        setDocuments((prevDocs) => {
          if (!prevDocs) return [];
          return prevDocs.map((doc) => {
            if (doc.id === document.id) {
              return {
                ...document
              };
            }
            return doc;
          });
        });
        showMessage({ message: 'המסמך עודכן בהצלחה', variant: 'success' });
        return;
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בעדכון המסמך', variant: 'error' });
      });
  };

  const handleStudentUpload = (document: DocumentInfo, file: File) => {
    if (!documentInfoService) {
      return Promise.resolve();
    }

    if (!user) {
      return Promise.resolve();
    }

    return documentInfoService
      .uploadStudentDocument(user.id, document, file)
      .then(() => {
        showMessage({ message: 'המסמך הועלה בהצלחה', variant: 'success' });
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בהעלאת המסמך', variant: 'error' });
      });
  };

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber.toString()} feedBackMessage={message} />}
      <DocumentFormModal open={show} handleClose={() => setShow(false)} onSaveDocument={handleDocumentAdd} />
      <div style={{ display: 'flex', justifyContent: 'center', border: '4px solid black' }}>
        <Card sx={{ minWidth: '1500px', minHeight: '700px', margin: '1rem', backgroundColor: 'background.default' }}>
          <CardActions>
            <div className="btn-search">
              <div className="search">
                <SearchBar documents={documents || []} query={searchQuery} setQuery={setSearchQuery} />
              </div>
              <RoleBasedAccessControl
                allowedRoles={[Role.Admin, Role.Owner]}
                unauthorizedAuthenticatedComponent={<></>}
                unauthorizedUnauthenticatedComponent={<></>}>
                <div className="btns">
                  <Button variant="contained" aria-label="add" onClick={handleShow}>
                    <AddIcon />
                  </Button>
                </div>
              </RoleBasedAccessControl>
            </div>
          </CardActions>
          <CardContent>
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                documentInfo={doc}
                onDocumentDelete={handleDocumentDelete}
                onDocumentUpdate={handleDocumentUpdate}
                onStudentUpload={handleStudentUpload}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DocumentsPage;
