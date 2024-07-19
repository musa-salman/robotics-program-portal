import React, { useState } from 'react';
import './EventCard.css';
import EditDeleteEvent from './EditDeleteEvent';
import RegisterStudentToEvent from './RegisterStudentToEvent';
import ShowRegisteredStudents from './ShowRegisteredStudents';
import Role from '../authentication/components/Roles';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import { formatDateTimeRange } from '../utils/dateFormatter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

export interface EventProps {
  startDate: Date;
  endDate: Date;
  title: string;
  details: string;
  image: string;
  onEventDelete: (id: string) => void;
  onEventEdit: (event: EventProps) => void;
  id: string;
  animating?: boolean; // New prop for animation state
}

const EventCard: React.FC<EventProps> = ({
  startDate,
  endDate,
  title,
  details,
  image,
  onEventDelete,
  onEventEdit,
  id,
  animating
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`event-card ${animating ? 'zoom-out' : 'zoom-in'}`}>
      <Card
        className="cardIconButton"
        sx={{ maxWidth: 380, minWidth: 380, background: 'linear-gradient(45deg, #4B4B4B 60%, #000000 60%)' }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <RoleBasedAccessControl
                allowedRoles={[Role.Admin, Role.Owner]}
                unauthorizedAuthenticatedComponent={<></>}>
                <EditDeleteEvent
                  event={{ startDate, endDate, title, details, image, onEventDelete, onEventEdit, id }}
                  editEvent={onEventEdit}
                  deleteEvent={onEventDelete}
                />
              </RoleBasedAccessControl>
            </IconButton>
          }
          title={
            <Typography variant="h5" component="div" style={{ minHeight: '32px' }}>
              {title}
            </Typography>
          }
          subheader={
            <Typography variant="h7" component="div" style={{ minHeight: '64px' }}>
              {formatDateTimeRange(startDate, endDate)}
            </Typography>
          }
        />
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress /> {/* Loading indicator */}
          </div>
        )}
        <img
          style={{ display: isLoading ? 'none' : 'block', height: '150px', width: '100%', objectFit: 'cover' }}
          src={image}
          alt={title}
          onLoad={() => setIsLoading(false)}
        />{' '}
        <CardContent>
          <Typography
            variant="h6"
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
          <RoleBasedAccessControl allowedRoles={[Role.Student]} unauthorizedAuthenticatedComponent={<></>}>
            <RegisterStudentToEvent eventId={id} eventDate={startDate} />
          </RoleBasedAccessControl>
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="show-registered-students">
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
              <ShowRegisteredStudents eventId={id} />
            </RoleBasedAccessControl>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventCard;
