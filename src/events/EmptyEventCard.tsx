import { Container, Typography } from '@mui/material';
import './EmptyEventCard.css';
import AddIcon from '@mui/icons-material/Add';

interface EmptyEventCardProps {
  handleAddEvent: () => void;
}

const EmptyEventCard: React.FC<EmptyEventCardProps> = ({ handleAddEvent }) => {
  return (
    <Container className="container">
      <img src="./Empty State Icon.jpg" alt="Image Description" />
      <Typography variant="h5" className="text">
        אין מה להראות
      </Typography>
      <Typography variant="body1" className="textt">
        {' '}
        זה ריק כאן אין קבצים
      </Typography>
      <button className="add-btn" onClick={handleAddEvent}>
        הוספה
        <AddIcon className="addIcon" />
      </button>
    </Container>
  );
};

export default EmptyEventCard;
