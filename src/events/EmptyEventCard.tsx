import { Container, Typography } from '@mui/material';
import './EmptyEventCard.css';
import AddEvent from './AddEvent';
import { EventProps } from './EventCard';

interface AddEventProps {
  addEvent: (event: EventProps) => void;
}

const EmptyEventCard: React.FC<AddEventProps> = ({ addEvent }) => {
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
      <AddEvent addEvent={addEvent} />
    </Container>
  );
};

export default EmptyEventCard;
