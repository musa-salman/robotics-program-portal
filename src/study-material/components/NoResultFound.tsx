import { Container, CssBaseline, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import './NoResultFound.css';

function NoResultFound() {
  return (
    <>
      <Container className="container">
        <SearchOffIcon className="SearchOffIcon" />
        <Typography className="tex">אין תוצאות למה בקשת להראות</Typography>
      </Container>
    </>
  );
}

export default NoResultFound;
