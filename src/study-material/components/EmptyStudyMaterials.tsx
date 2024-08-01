import { Button, Container, Modal, Typography } from '@mui/material';
import './EmptyStudyMaterials.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import { useState } from 'react';
import { StudyMaterial } from '../repository/StudyMaterial';
import MaterialUploadModal from './upload-file/MaterialUploadModal';

interface EmptyStudyMaterialsProps {
  handleAdd: (studyMaterial: StudyMaterial) => void;
}

function EmptyStudyMaterials({ handleAdd }: EmptyStudyMaterialsProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="container">
        <FolderOffIcon sx={{ margin: '10px', fontSize: '50px' }} />
        <Typography variant="h5" className="text">
          אין מה להראות
        </Typography>
        <Typography variant="body1" sx={{ margin: '10px', fontSize: '1.5rem' }}>
          זה ריק כאן אין קבצים
        </Typography>
        <Button sx={{ margin: '20px', width: '10rem', fontSize: '20px' }} onClick={handleShow}>
          העלה
          <FileUploadIcon sx={{ margin: '10px' }} />
        </Button>
      </Container>

      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MaterialUploadModal handleClose={handleClose} handleAdd={handleAdd} initialValue={null} />
      </Modal>
    </>
  );
}

export default EmptyStudyMaterials;
