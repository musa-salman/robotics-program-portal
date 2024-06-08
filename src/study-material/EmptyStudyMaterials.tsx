import { Container, CssBaseline, Typography } from '@mui/material';
import './EmptyStudyMaterials.css';
import AddIcon from '@mui/icons-material/Add';

function EmptyStudyMaterials() {
  const handleAdd = () => {};

  return (
    <>
      <CssBaseline />
      <Container className="container">
        <img src="./Empty State Icon.jpg" alt="Image Description" />
        <Typography variant="h5" className="text">
          אין מה להראות
        </Typography>
        <Typography variant="body1" className="textt">
          {' '}
          זה ריק כאן אין קבצים
        </Typography>
        <button className="add-btn" onClick={handleAdd}>
          הוספה
          <AddIcon className="addIcon" />
        </button>
      </Container>
    </>
  );
}

export default EmptyStudyMaterials;
