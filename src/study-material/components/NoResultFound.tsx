import { Container, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import './NoResultFound.css';

/**
 * Renders a component to display when no results are found.
 */
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
