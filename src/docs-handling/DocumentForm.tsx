import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid, InputAdornment } from '@mui/material';
import { DocumentInfo } from './service/DocumentInfo';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

/**
 * Props for the DocumentForm component.
 *
 * @interface DocumentFormProps
 * @property {DocumentInfo} [initialDocument] - The initial document information.
 * @property {boolean} open - Indicates whether the form is open or not.
 * @property {() => void} handleClose - Callback function to handle form close event.
 * @property {(document: DocumentInfo, file?: File) => Promise<void>} onSaveDocument - Callback function to save the document.
 */
interface DocumentFormProps {
  initialDocument?: DocumentInfo;
  open: boolean;
  handleClose: () => void;
  onSaveDocument: (document: DocumentInfo, file?: File) => Promise<void>;
}

/**
 * Modal component for handling document forms.
 *
 * @component
 * @param {DocumentFormProps} props - The component props.
 * @param {DocumentInfo} props.initialDocument - The initial document information.
 * @param {boolean} props.open - Flag indicating whether the modal is open or not.
 * @param {() => void} props.handleClose - Function to handle modal close event.
 * @param {(documentInfo: DocumentInfo, file: File | undefined) => Promise<void>} props.onSaveDocument - Function to handle document save event.
 * @returns {JSX.Element} The DocumentFormModal component.
 */
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
    if (!documentInfo.name || (!file && !initialDocument)) {
      return;
    }

    onSaveDocument(documentInfo, file).then(() => {
      handleFileCancel();

      if (initialDocument) {
        handleClose();
        return;
      }

      setDocumentInfo({
        id: '',
        name: '',
        filename: '',
        description: ''
      });
      handleClose();
    });
  };

  const handleFileCancel = () => {
    setFile(undefined);
    setDocumentInfo((prevState) => ({
      ...prevState,
      filename: ''
    }));

    const fileInput = document.getElementById('upload-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  //       <form style={{ marginTop: '0.25rem' }}>
  //         <div className="card">
  //           <Grid xs={12} md={4}>
  //             <MaterialCardPreview studyMaterial={studyMaterial} />
  //           </Grid>
  //         </div>
  //         <Grid container spacing={3}>
  //           <Grid item xs={11.6}>
  //             <GPT
  //               initialValue=""
  //               getData={() => suggestMaterialTitles(studyMaterial)}
  //               options={{ simplify: false, improve: false, shorten: false }}>
  //               <TextField
  //                 fullWidth
  //                 label="כותרת"
  //                 name="title"
  //                 value={studyMaterial.title}
  //                 onChange={handleInput}
  //                 required
  //                 error={!isValid.title || isForward}
  //                 onBlur={() => {
  //                   setIsValid((prevData) => ({ ...prevData, title: studyMaterial.title !== '' }));
  //                 }}
  //                 helperText={!isValid.title ? 'יש למלה' : `${studyMaterial.title.length}/${MAX_CHARS_Title} אותיות`}
  //                 inputProps={{ maxLength: MAX_CHARS_Title }}
  //               />
  //             </GPT>
  //           </Grid>
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40rem',
          boxShadow: 24,
          backgroundColor: 'background.paper',
          p: 4,
          borderRadius: 1,
          outline: 'none'
        }}>
        <Typography id="modal-modal-title" variant="h1" sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
          העלת קובץ
        </Typography>
        <form style={{ marginTop: '1rem' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="שם המסמך"
                name="name"
                value={documentInfo.name}
                onChange={handleChange}
                fullWidth
                error={!documentInfo.name}
                helperText={!documentInfo.name ? 'שדה חובה' : ''}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                style={{ marginTop: '1.50rem', paddingLeft: '0.25rem', paddingRight: '1.3rem' }}
                fullWidth
                disabled
                value={initialDocument?.filename}
                placeholder="שם קובץ"
                error={!file && !initialDocument}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <input
                        id="upload-file"
                        type="file"
                        hidden
                        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="upload-file">
                        <Button variant="contained" component="label" htmlFor="upload-file">
                          <CloudUploadIcon />
                          לעלות קובץ
                        </Button>
                      </label>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid xs={12} style={{ paddingLeft: '0.25rem', paddingRight: '1.25rem' }}>
              <TextField
                style={{ marginTop: '1.50rem' }}
                name="description"
                label="תיאור"
                placeholder="הכנס תיאור כאן"
                variant="outlined"
                fullWidth
                value={documentInfo.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </form>

        {/* <Button variant="contained" component="label" color="secondary">
              העלה קובץ
              <Input
                id="upload-file"
                type="file"
                hidden
                error={!file && !initialDocument}
                inputProps={{
                  accept:
                    'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }}
                onChange={handleFileChange}
                fullWidth
              />
            </Button> */}
        {/* {file && (
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    קובץ נבחר: {file.name}
                  </Typography>
                  <Button color="error" onClick={handleFileCancel}>
                    בטל
                  </Button>
                </Box>
              </Box>
            )} */}

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
