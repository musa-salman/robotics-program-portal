import React, { useState } from 'react';
import './EventCard.css';
import EditDeleteEvent from './EditDeleteEvent';
import RegisterStudentToEvent from './RegisterStudentToEvent';
import ShowRegisteredStudents from './ShowRegisteredStudents';
import Role from '../authentication/components/Roles';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import formatDate from '../utils/dateFormatter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export interface EventProps {
  date: Date;
  title: string;
  details: string;
  image: string;
  onEventDelete: (id: string) => void;
  onEventEdit: (event: EventProps) => void;
  id: string;
}

const EventCard: React.FC<EventProps> = ({ date, title, details, image, onEventDelete, onEventEdit, id }) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
              <EditDeleteEvent
                event={{ date, title, details, image, onEventDelete, onEventEdit, id }}
                editEvent={onEventEdit}
                deleteEvent={onEventDelete}
              />
            </RoleBasedAccessControl>
          </IconButton>
        }
        title={title}
        subheader={formatDate(date)}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <h5>{details}</h5>
        </Typography>
      </CardContent>

      <div className="register-button">
        <RoleBasedAccessControl allowedRoles={[Role.Student]} unauthorizedAuthenticatedComponent={<></>}>
          <RegisterStudentToEvent eventId={id} />
        </RoleBasedAccessControl>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
            <ShowRegisteredStudents eventId={id} />
          </RoleBasedAccessControl>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
