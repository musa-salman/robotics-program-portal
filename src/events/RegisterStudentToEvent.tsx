import { useContext, useEffect, useState } from 'react';
import { useEventService } from './repository/EventContext';
import { AuthContext } from '../authentication/services/AuthContext';
import { StudentContext } from '../students-management/StudentContext';
import { Student } from '../students-management/Student';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface RegisterStudentToEventProps {
  eventId: string;
}

const RegisterStudentToEvent: React.FC<RegisterStudentToEventProps> = ({ eventId }) => {
  const [isRegistered, setRegister] = useState<boolean | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const handleCloseRegister = () => setShowModalRegister(false);
  const handleShowRegister = () => setShowModalRegister(true);

  const eventService = useEventService();
  const studentRepository = useContext(StudentContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkIfRegistered = () => {
      eventService.isStudentRegistered(user?.id, eventId).then((isRegistered) => {
        setRegister(isRegistered);
      });
    };

    const fetchStudent = () => {
      if (!user) return;
      studentRepository.findOne(user.id).then((student) => {
        setStudent(student);
      });
    };

    if (user && student === null) fetchStudent();
    if (student && isRegistered === null) checkIfRegistered();
  }, [isRegistered, student]);

  function handleRegister() {
    handleShowRegister();
  }

  const handleSaveRegister = () => {
    setShowModalRegister(false);
    if (!student) return;
    eventService
      .registerStudentForEvent(
        {
          id: student.id,
          name: student.firstName + ' ' + student.lastName,
          email: student.studentEmail,
          phone: student.studentPhoneNumber
        } as BriefStudent,
        eventId
      )
      .then(() => setRegister(true));
  };

  function RegisterWindow() {
    const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSaveRegister();
    };

    return (
      <Dialog open={showModalRegister} onClose={handleCloseRegister} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmitRegister}>
          <DialogTitle id="form-dialog-title">האם אתה בטוח שאתה רוצה להירשם לאירוע</DialogTitle>
          <DialogContent>
            <FormGroup style={{ display: 'flex', gap: '10px' }}>
              <FormControlLabel control={<></>} label="אני מאשר שאני רוצה להירשם לאירוע" />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRegister} color="secondary">
              סגור
            </Button>
            <Button type="submit" color="primary">
              מאשר
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

  return (
    <>
      {isRegistered ? (
        <Button variant="contained" color="secondary" disabled>
          רשום
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleRegister}>
          הירשם
        </Button>
      )}
      <RegisterWindow />
    </>
  );
};

export default RegisterStudentToEvent;
