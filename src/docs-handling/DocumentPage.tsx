import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { useDocumentInfoService } from './service/DocumentInfoContext';
import DocumentCard from './DocumentCard';
import { Add } from '@mui/icons-material';
import DocumentFormModal from './DocumentForm';
import { AuthContext } from '../authentication/services/AuthContext';
import { DocumentInfo } from './service/DocumentInfo';

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentInfo[] | undefined>(undefined);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

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
      });
  }, [documentInfoService]);

  const handleDocumentAdd = (document: DocumentInfo, file?: File | undefined): Promise<void> => {
    if (!documentInfoService) {
      return Promise.resolve();
    }

    if (!file) {
      return Promise.resolve();
    }

    return documentInfoService.addDocument(document, file).then((docRef) => {
      document.id = docRef.id;
      setDocuments((prevDocs) => {
        if (!prevDocs) return [];
        return [...prevDocs, document];
      });
    });
  };

  const handleDocumentDelete = (documentId: string) => {
    if (!documentInfoService) {
      return;
    }

    documentInfoService.deleteDocument(documentId).then(() => {
      setDocuments((prevDocs) => {
        if (!prevDocs) return [];
        return prevDocs.filter((doc) => doc.id !== documentId);
      });
    });
  };

  const handleDocumentUpdate = (document: DocumentInfo, file?: File) => {
    if (!documentInfoService) {
      return Promise.resolve();
    }

    const id = document.id.toString();
    return documentInfoService.updateDocument(document, file).then(() => {
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
      return;
    });
  };

  const handleStudentUpload = (documentId: string, file: File) => {
    if (!documentInfoService) {
      return Promise.resolve();
    }

    if (!user) {
      return Promise.resolve();
    }

    return documentInfoService.uploadStudentDocument(user.id, documentId, file).then(() => {
      console.log('Uploaded');
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
              documentInfo={doc}
              onDocumentDelete={handleDocumentDelete}
              onDocumentUpdate={handleDocumentUpdate}
              onStudentUpload={handleStudentUpload}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default DocumentsPage;
