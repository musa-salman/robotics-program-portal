import React, { useContext, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Delete } from '@mui/icons-material';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { DocumentInfo } from './DocumentInfo';

interface DocumentCardProps {
  document: DocumentInfo;
  onDocumentDelete: (documentId: string) => void;
  onDocumentUpdate: (document: DocumentInfo, file?: File) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDocumentDelete, onDocumentUpdate }) => {
  const [file, setFile] = useState<File | null>(null);

  const storage = useContext(StorageServiceContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    onDocumentUpdate(document, file!);
  };

  const handleDelete = () => {
    onDocumentDelete(document.id);
  };

  const handleDownload = () => {
    storage.download(`documents/${document.id}`, document.filename).then(() => {
      console.log('Downloaded');
    });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '1rem' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {document.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {document.description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <CardActions>
          <Button variant="contained" color="primary" startIcon={<GetAppIcon />} onClick={handleDownload}>
            הורד
          </Button>
          <Button variant="contained" component="label" color="secondary" startIcon={<CloudUploadIcon />}>
            העלה קובץ
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </CardActions>
        <CardActions>
          <IconButton color="default" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </CardActions>
      </Box>
      {file && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              קובץ נבחר: {file.name}
            </Typography>
            <Button color="error" onClick={() => setFile(null)}>
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
  );
};

export default DocumentCard;
