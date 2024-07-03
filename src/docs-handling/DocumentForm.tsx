import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Input, InputLabel } from '@mui/material';
import { DocumentInfo } from './DocumentInfo';

interface DocumentFormProps {
  initialDocument?: DocumentInfo;
  open: boolean;
  handleClose: () => void;
  onSaveDocument: (document: DocumentInfo, file?: File) => Promise<void>;
}

const DocumentFormModal: React.FC<DocumentFormProps> = ({ initialDocument, open, handleClose, onSaveDocument }) => {
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>(
    initialDocument || {
      id: '',
      name: '',
      filename: '',
      description: ''
    }
  );

  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    setDocumentInfo((prevState) => ({
      ...prevState,
      filename: e.target.files![0].name
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocumentInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSaveDocument(documentInfo, file).then(() => {
      setDocumentInfo({
        id: '',
        name: '',
        filename: '',
        description: ''
      });
      handleClose();
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
        <TextField label="שם המסמך" name="name" value={documentInfo.name} onChange={handleChange} fullWidth />

        <InputLabel htmlFor="upload-file">
          <Typography variant="body2" component="span">
            קובץ
          </Typography>
        </InputLabel>
        <Input
          id="upload-file"
          type="file"
          inputProps={{ accept: 'application/pdf' }}
          onChange={handleFileChange}
          fullWidth
        />

        <TextField
          label="תיאור"
          name="description"
          value={documentInfo.description}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {documentInfo.id === '' ? 'הוסף' : 'עדכן'}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            ביטול
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DocumentFormModal;
