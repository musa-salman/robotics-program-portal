import React from 'react';
import './EventCard.css';
import { formatDateTimeRange } from '../utils/dateFormatter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';

export interface EventProps {
  startDate: Date;
  endDate: Date;
  title: string;
  details: string;
  image: string;
}

const EventCardPreview: React.FC<EventProps> = ({ startDate, endDate, title, details, image }) => {
  console.log('EventCardPreview: ', startDate, endDate, title, details, image);
  return (
    <Card className="cardIconButton" sx={{ maxWidth: 380, minWidth: 380 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h5" component="div" style={{ minHeight: '32px' }}>
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="h7" component="div" style={{ minHeight: '50px' }}>
            {formatDateTimeRange(startDate, endDate)}
          </Typography>
        }
      />
      <CardMedia component="img" height="150" image={image} alt={title} />
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          style={{
            minHeight: '100px',
            maxHeight: '100px',
            wordWrap: 'break-word' // Ensures long words will be broken and wrapped to the next line
          }}>
          {details}
        </Typography>
      </CardContent>

      <div className="register-button">
        <Button variant="contained" color="primary">
          הירשם
        </Button>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="show-registered-students">
          <GroupsIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCardPreview;
