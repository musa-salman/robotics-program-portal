import { useContext, useEffect, useState } from 'react';
import { eventServiceContext } from './repository/EventContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import { Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';

interface RegisterStudentToEventProps {
  eventId: string;
}

const ShowRegisteredStudents: React.FC<RegisterStudentToEventProps> = ({ eventId }) => {
  const [registeredStudents, setRegisteredStudents] = useState<BriefStudent[] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const eventManager = useContext(eventServiceContext);

  useEffect(() => {
    const getRegisteredStudents = async () => {
      setRegisteredStudents(await eventManager.getRegisteredStudents(eventId));
    };

    if (registeredStudents === null) getRegisteredStudents();
  }, [registeredStudents]);

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRemoveRegistration = (studentId: string) => {
    // Add your code to remove the student registration here
    eventManager.cancelRegistration(studentId, eventId);
    setRegisteredStudents((registeredStudents || []).filter((student) => student.id !== studentId));
  };

  const ShowDetails = () => {
    return (
      <div>
        <Button variant="contained" onClick={handleDetails}>
          תלמידים רשומים
        </Button>
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
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.email}</TableCell>
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
    <>
      <ShowDetails />
    </>
  );
};

export default ShowRegisteredStudents;
