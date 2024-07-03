import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { useDocumentInfo } from './DocumentInfoContext';
import DocumentCard from './DocumentCard';
import { Add } from '@mui/icons-material';
import DocumentFormModal from './DocumentForm';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { AuthContext } from '../authentication/services/AuthContext';
import { DocumentInfo } from './DocumentInfo';

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentInfo[] | undefined>(undefined);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const documentRepository = useDocumentInfo();
  const storage = useContext(StorageServiceContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!documentRepository) {
      return;
    }

    documentRepository.find().then((docs) => {
      setDocuments(docs);
    });
  }, [documentRepository]);

  const handleDocumentAdd = (document: DocumentInfo, file?: File | undefined): Promise<void> => {
    if (!documentRepository) {
      return Promise.resolve();
    }

    if (!file) {
      return Promise.resolve();
    }

    return documentRepository.create(document).then((doc) => {
      storage.upload(
        file,
        `documents/${doc.id}`,
        () => {},
        () => {},
        () => {
          document.id = doc.id;
          setDocuments((prevDocs) => {
            if (!prevDocs) return [];
            return [...prevDocs, document];
          });
        }
      );
    });
  };

  const handleDocumentDelete = (documentId: string) => {
    if (!documentRepository) {
      return;
    }

    documentRepository.delete(documentId).then(() => {
      storage.delete(`documents/${documentId}`).then(() => {
        setDocuments((prevDocs) => {
          if (!prevDocs) return [];
          return prevDocs.filter((doc) => doc.id !== documentId);
        });
      });
    });
  };

  const handleDocumentUpdate = (document: DocumentInfo, file?: File) => {
    if (!documentRepository) {
      return;
    }

    documentRepository.update(document.id, document).then(() => {
      if (file) {
        storage.upload(
          file,
          `documents/${document.id}-${user?.id}`,
          () => {},
          () => {},
          () => {
            setDocuments((prevDocs) => {
              if (!prevDocs) return [];
              return prevDocs.map((doc) => {
                if (doc.id === document.id) {
                  return {
                    ...doc,
                    downloadLink: `documents/${document.id}-${user?.id}`
                  };
                }
                return doc;
              });
            });
          }
        );
      }
    });
  };

  return (
    <>
      <DocumentFormModal open={show} handleClose={() => setShow(false)} onSaveDocument={handleDocumentAdd} />
      <Card sx={{ maxWidth: 600, margin: '1rem' }}>
        <CardActions>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleShow}>
            הוסף מסמך
          </Button>
        </CardActions>
        <CardContent>
          {documents?.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDocumentDelete={handleDocumentDelete}
              onDocumentUpdate={handleDocumentUpdate}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default DocumentsPage;
