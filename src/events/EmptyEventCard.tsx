import { Container, Typography } from '@mui/material';
import './EmptyEventCard.css';
import AddEvent from './AddEvent';
import { EventProps } from './EventCard';

interface AddEventProps {
  addEvent: (event: EventProps) => void;
}

/**
 * Represents an empty event card component.
 * @component
 * @param {AddEventProps} props - The properties for the component.
 * @param {Function} props.addEvent - The function to add an event.
 * @returns {JSX.Element} The rendered empty event card.
 */
const EmptyEventCard: React.FC<AddEventProps> = ({ addEvent }) => {
  return (
    <Container className="container">
      <Typography variant="h5" className="text">
        אין אירועים קרובים
      </Typography>
      <Typography variant="body1" className="textt">
        הוסף אירוע חדש כדי לראות אותו כאן
      </Typography>
      <AddEvent addEvent={addEvent} />
    </Container>
  );
};

export default EmptyEventCard;
