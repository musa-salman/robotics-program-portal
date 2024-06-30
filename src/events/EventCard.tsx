import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './EventCard.css';
import moment from 'moment';
import { CircularProgress, Box } from '@mui/material';
import EditDeleteEvent from './EditDeleteEvent';
import RegisterStudentToEvent from './RegisterStudentToEvent';
import ShowRegisteredStudents from './ShowRegisteredStudents';
import Role from '../authentication/components/Roles';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';

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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="event-card">
      {isLoading && (
        <Box className="loading-image">
          <CircularProgress />
        </Box>
      )}
      <Card.Img
        variant="top"
        src={image}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <Card.Body style={{ marginTop: '150px' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>תאריך:</strong> {moment(date).format('YYYY-MM-DD')}
          <br />
          <strong>פרטים:</strong> {details}
        </Card.Text>
        <RoleBasedAccessControl allowedRoles={[Role.Student]} unauthorizedAuthenticatedComponent={<></>}>
          <RegisterStudentToEvent eventId={id} />
        </RoleBasedAccessControl>
      </Card.Body>
      <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
        <EditDeleteEvent
          event={{ date, title, details, image, onEventDelete, onEventEdit, id }}
          editEvent={onEventEdit}
          deleteEvent={onEventDelete}
        />
        <ShowRegisteredStudents eventId={id} />
      </RoleBasedAccessControl>
    </Card>
  );
};

export default EventCard;
