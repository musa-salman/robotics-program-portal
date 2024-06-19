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
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [isRegistered, setRegister] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const handleCloseRegister = () => setShowModalRegister(false);
  const handleShowRegister = () => setShowModalRegister(true);
  const [showDetails, setShowDetails] = useState(false);

  const eventManager = useContext(eventManagerContext);

  function handleRegister() {
    handleShowRegister();
  }

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const student: BriefStudent = {
    id: 'getUserId()',
    name: 'getName()',
    email: 'getEmail()',
    phone: 'getPhone()'
  };

  const [registeredStudents, setRegisteredStudents] = useState<BriefStudent[] | null>(null);

  // //FIXME: get user id

  const checkIfRegistered = async () => {
    setRegister(await eventManager.isStudentRegistered(student.id, id));
    console.log('isRegistered', isRegistered);
  };

  useEffect(() => {
    const getRegisteredStudents = async () => {
      setRegisteredStudents(await eventManager.getRegisteredStudents(id));
    };

    if (registeredStudents === null) getRegisteredStudents();
    if (registeredStudents !== null) checkIfRegistered();
  }, [registeredStudents]);

  const handleSaveRegister = async () => {
    setShowModalRegister(false);
    if (registeredStudents && !registeredStudents.find((user) => user.id === student.id) && id !== '') {
      eventManager.registerStudentForEvent(student, id);
      registeredStudents?.push(student);
      setRegister(true);
    }
  };

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

  function registerWindow() {
    const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSaveRegister();
    };

    return (
      <>
        <Modal show={showModalRegister} onHide={handleCloseRegister} style={{ display: 'center' }}>
          <Form onSubmit={handleSubmitRegister}>
            <Modal.Header closeButton>
              <Modal.Title>האם אתה בטוח שאתה רוצה להירשם לאירוע</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Form.Check required aria-label="option 1" feedback="You must agree before submitting." />
                אני מאשר שאני רוצה להירשם לאירוע
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRegister}>
                  סגור
                </Button>
                <Button variant="primary" type="submit">
                  מאשר
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        </Modal>
      </>
    );
  }

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
          <p>
            <strong>תאריך:</strong> {moment(date).format('YYYY-MM-DD')}
          </p>
          <p>
            <strong>פרטים:</strong> {details}
          </p>
        </Card.Text>
        {isRegistered ? (
          <Button variant="secondary" disabled>
            רשום
          </Button>
        ) : (
          <Button variant="primary" onClick={handleRegister}>
            הירשם
          </Button>
        )}
      </Card.Body>
      <EditDeleteEvent
        event={{ date, title, details, image, onEventDelete, onEventEdit, id }}
        editEvent={onEventEdit}
        deleteEvent={onEventDelete}
      />
      {registerWindow()}
      {handleShowDetails()}
    </Card>
  );
};

export default EventCard;
