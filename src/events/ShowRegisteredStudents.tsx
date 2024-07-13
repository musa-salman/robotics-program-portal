import { useEffect, useState } from 'react';
import { useEventService } from './repository/EventContext';
import GroupsIcon from '@mui/icons-material/Groups';
import { TransitionGroup } from 'react-transition-group';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  List,
  Collapse,
  ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface RegisterStudentToEventProps {
  eventId: string;
}

const ShowRegisteredStudents: React.FC<RegisterStudentToEventProps> = ({ eventId }) => {
  const [registeredStudents, setRegisteredStudents] = useState<BriefStudent[] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const eventService = useEventService();

  useEffect(() => {
    const getRegisteredStudents = () => {
      eventService.getRegisteredStudents(eventId).then((students) => {
        setRegisteredStudents(students);
      });
    };

    if (registeredStudents === null) getRegisteredStudents();
  }, [registeredStudents]);

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRemoveRegistration = (studentId: string) => {
    // Add your code to remove the student registration here
    eventService.cancelRegistration(studentId, eventId);

    setRegisteredStudents((registeredStudents || []).filter((student) => student.id !== studentId));
  };

  function renderItem(student: BriefStudent, index: number) {
    return (
      <ListItem
        secondaryAction={
          <TableRow key={index}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.phone}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>
              <IconButton onClick={() => handleRemoveRegistration(student.id)} aria-label="delete" size="small">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        }>
        <ListItemText primary={index + 1} />
      </ListItem>
    );
  }

  const ShowDetails = () => {
    return (
      <div>
        <GroupsIcon onClick={handleDetails} />
        <Dialog open={showDetails} onClose={handleDetails} aria-labelledby="customized-dialog-title">
          <DialogTitle id="customized-dialog-title">רשומים לאירוע</DialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>סך הסטודנטים הרשומים : {registeredStudents?.length}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <List sx={{ maxWidth: 450, minWidth: 450 }}>
                    <TransitionGroup>
                      {registeredStudents?.map((student, index) => (
                        <Collapse key={index}>{renderItem(student, index)}</Collapse>
                      ))}
                    </TransitionGroup>
                  </List>

                  {/* {registeredStudents?.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleRemoveRegistration(student.id)}
                          aria-label="delete"
                          size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
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
