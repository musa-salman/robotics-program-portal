import React, { useContext, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Delete, Edit } from '@mui/icons-material';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { DocumentInfo } from './service/DocumentInfo';
import DocumentFormModal from './DocumentForm';

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

  const storage = useContext(StorageServiceContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    onStudentUpload(documentInfo.id, file!);
  };

  const handleDelete = () => {
    onDocumentDelete(documentInfo.id);
  };

  const handleDownload = () => {
    storage.download(`documents/${documentInfo.id}`, documentInfo.filename).then(() => {
      console.log('Downloaded');
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
            <Button variant="contained" component="label" color="secondary" startIcon={<CloudUploadIcon />}>
              העלה קובץ
              <input id={`file-upload-${documentInfo.id}`} type="file" hidden onChange={handleFileChange} />
            </Button>
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
