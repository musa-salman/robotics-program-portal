import { Container, CssBaseline, Typography } from '@mui/material';
import './EmptyStudyMaterials.css';

function NoResultFound() {
  return (
    <>
      <CssBaseline />
      <Container className="container">
        <img src="./Empty State Icon.jpg" alt="Image Description" />
        <Typography variant="h5" className="text">
          אין תוצאות למה בקשת להראות
        </Typography>
      </Container>
    </>
  );
}

export default NoResultFound;
