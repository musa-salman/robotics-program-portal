import React, { useContext, useState, useEffect } from 'react';
import { eventManagerContext } from './repository/EventManagerContext';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import './EventCard.css';
import moment from 'moment';
import { CircularProgress, Box, IconButton } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../authentication/AuthContext';
import EditDeleteEvent from './EditDeleteEvent';
import RegisterStudentToEvent from './RegisterStudentToEvent';

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

  const [showDetails, setShowDetails] = useState(false);

  const eventManager = useContext(eventManagerContext);

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const [registeredStudents, setRegisteredStudents] = useState<BriefStudent[] | null>(null);

  const handleRemoveRegistration = (studentId: string) => {
    // Add your code to remove the student registration here
    eventManager.cancelRegistration(studentId, id);
    setRegisteredStudents((registeredStudents || []).filter((student) => student.id !== studentId));
  };

  const handleShowDetails = () => {
    return (
      <div>
        <Modal show={showDetails} onHide={handleDetails} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>רשומים לאירוע</Modal.Title>
          </Modal.Header>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>סך הסטודנטים הרשומים : {registeredStudents?.length}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registeredStudents?.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveRegistration(student.id)} aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal>
      </div>
    );
  };

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
        {/* <AdminMenu handleEdit={handleEdit} handleDelete={handleDelete} handleDetails={handleDetails} /> */}
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>תאריך:</strong> {moment(date).format('YYYY-MM-DD')}
          <br />
          <strong>פרטים:</strong> {details}
        </Card.Text>
        <RegisterStudentToEvent eventId={id} />
      </Card.Body>
      <EditDeleteEvent
        event={{ date, title, details, image, onEventDelete, onEventEdit, id }}
        editEvent={onEventEdit}
        deleteEvent={onEventDelete}
      />
      {handleShowDetails()}
    </Card>
  );
};

export default EventCard;
