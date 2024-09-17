import React from 'react';
import './EventCard.css';
import { formatDateTimeRange } from '../utils/dateFormatter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export interface EventProps {
  startDate: Date;
  endDate: Date;
  title: string;
  details: string;
  image: string;
}

const EventCardPreview: React.FC<EventProps> = ({ startDate, endDate, title, details, image }) => {
  const theme = useTheme();

  return (
    <Card
      className="cardIconButton"
      sx={{
        maxWidth: 480,
        minWidth: 480,
        background: theme.palette.background.paper,
        boxShadow: `0 4px 8px ${theme.palette.primary.main}`
      }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <div className="adminOptions">
              <MoreVertIcon />
            </div>
          </IconButton>
        }
        title={
          <Typography
            variant="h4"
            component="div"
            style={{
              minHeight: '32px',
              maxWidth: '320px',
              color: theme.palette.primary.main,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}>
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="body2" component="div" style={{ minHeight: '64px' }}>
            {formatDateTimeRange(startDate, endDate)}
          </Typography>
        }
      />
      <img style={{ display: 'block', height: '150px', width: '100%', objectFit: 'cover' }} src={image} alt={title} />{' '}
      <CardContent>
        <Typography
          variant="h6"
          color="text.secondary"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            maxHeight: '4.5em',
            minHeight: '4.5em'
          }}>
          {details}
        </Typography>
        <Button size="small">קרא עוד</Button>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary">
          הירשם
        </Button>
        <IconButton aria-label="show-registered-students">
          <GroupsIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCardPreview;
