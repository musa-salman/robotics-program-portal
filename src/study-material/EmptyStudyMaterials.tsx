import { Container, CssBaseline, Typography } from '@mui/material';
import './EmptyStudyMaterials.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderOffIcon from '@mui/icons-material/FolderOff';

function EmptyStudyMaterials() {
  const handleAdd = () => {};

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
        <button className="add-btn" onClick={handleAdd}>
          הוספה
          <FileUploadIcon className="addIcon" />
        </button>
      </Container>
    </>
  );
}

export default EmptyStudyMaterials;
