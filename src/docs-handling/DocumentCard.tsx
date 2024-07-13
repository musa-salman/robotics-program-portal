import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Delete, Edit } from '@mui/icons-material';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { DocumentInfo } from './service/DocumentInfo';
import DocumentFormModal from './DocumentForm';
import { AuthContext } from '../authentication/services/AuthContext';
import Role from '../authentication/components/Roles';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';

interface DocumentCardProps {
  documentInfo: DocumentInfo;
  onDocumentDelete: (documentId: string) => void;
  onDocumentUpdate: (document: DocumentInfo, file?: File) => Promise<void>;
  onStudentUpload: (documentId: string, file: File) => Promise<void>;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  documentInfo,
  onDocumentDelete,
  onDocumentUpdate,
  onStudentUpload
}) => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState<number>(0);

  const storage = useContext(StorageServiceContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!storage || !documentInfo.id || !user || !user.roles.includes(Role.Student)) {
      return;
    }

    storage
      .exists(`documents/${documentInfo.id}/${user.id}`)
      .then((exists) => {
        setIsFileUploaded(exists);
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בטעינת המסמך', variant: 'error' });
      });
  }, [user]);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    onStudentUpload(documentInfo.id, file!)
      .then(() => {
        setIsFileUploaded(true);
        setFile(null);
        showMessage({ message: 'הקובץ הועלה בהצלחה', variant: 'success' });
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בהעלאת הקובץ', variant: 'error' });
      });
  };

  const handleDelete = () => {
    onDocumentDelete(documentInfo.id);
  };

  const handleDeleteFile = () => {
    if (!user || !storage) {
      return;
    }

    storage
      .delete(`documents/${documentInfo.id}/${user.id}`)
      .then(() => {
        setIsFileUploaded(false);
        showMessage({ message: 'הקובץ נמחק בהצלחה', variant: 'success' });
      })
      .catch(() => {
        showMessage({ message: 'שגיאה במחיקת הקובץ', variant: 'error' });
      });
  };

  const handleDownload = () => {
    storage.download(`documents/${documentInfo.id}`, documentInfo.filename).catch(() => {
      showMessage({ message: 'שגיאה בהורדת הקובץ', variant: 'error' });
    });
  };

  const handleFileCancel = () => {
    setFile(null);

    const fileInput = document.getElementById(`file-upload-${documentInfo.id}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      <DocumentFormModal
        open={show}
        handleClose={() => setShow(false)}
        onSaveDocument={onDocumentUpdate}
        initialDocument={documentInfo}
      />
      <Card sx={{ maxWidth: 600, margin: '1rem' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {documentInfo.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {documentInfo.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <CardActions>
            <Button variant="contained" color="primary" startIcon={<GetAppIcon />} onClick={handleDownload}>
              הורד
            </Button>
            {!isFileUploaded ? (
              <Button variant="contained" component="label" color="secondary" startIcon={<CloudUploadIcon />}>
                העלה קובץ
                <input id={`file-upload-${documentInfo.id}`} type="file" hidden onChange={handleFileChange} />
              </Button>
            ) : (
              <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleDeleteFile}>
                מחק קובץ
              </Button>
            )}
          </CardActions>
          <CardActions>
            <IconButton color="default" onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton color="default" onClick={() => setShow(true)}>
              <Edit />
            </IconButton>
          </CardActions>
        </Box>
        {file && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                קובץ נבחר: {file.name}
              </Typography>
              <Button color="error" onClick={handleFileCancel}>
                בטל
              </Button>
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpload}
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1 }}>
              העלה
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
};

export default DocumentCard;
