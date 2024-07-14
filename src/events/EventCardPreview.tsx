import React from 'react';
import './EventCard.css';
import formatDate from '../utils/dateFormatter';
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
  date: Date;
  title: string;
  details: string;
  image: string;
}

const EventCardPreview: React.FC<EventProps> = ({ date, title, details, image }) => {
  return (
    <Card className="cardIconButton" sx={{ maxWidth: 345, minWidth: 345 }}>
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
        subheader={formatDate(date)}
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
