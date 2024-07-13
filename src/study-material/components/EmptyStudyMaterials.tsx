import { Container, CssBaseline, Modal, Typography } from '@mui/material';
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
      <CssBaseline />
      <Container className="container">
        <FolderOffIcon />
        <Typography variant="h5" className="text">
          אין מה להראות
        </Typography>
        <Typography variant="body1" className="textt">
          {' '}
          זה ריק כאן אין קבצים
        </Typography>
        <button className="add-btn" onClick={handleShow}>
          העלה
          <FileUploadIcon className="addIcon" />
        </button>
      </Container>

      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MaterialUploadModal handleClose={handleClose} handleAdd={handleAdd} />
      </Modal>
    </>
  );
}

export default EmptyStudyMaterials;
