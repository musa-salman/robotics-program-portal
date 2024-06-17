import { Container, CssBaseline, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import './EmptyStudyMaterials.css';

function NoResultFound() {
  return (
    <>
      <CssBaseline />
      <Container className="container">
        <SearchOffIcon />
        <Typography variant="h5" className="text">
          אין תוצאות למה בקשת להראות
        </Typography>
      </Container>
    </>
  );
}

export default NoResultFound;
