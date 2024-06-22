import { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { eventServiceContext } from './repository/EventContext';
import { AuthContext } from '../authentication/AuthContext';
import { StudentContext } from '../students-management/StudentContext';
import { Student } from '../students-management/Student';

interface RegisterStudentToEventProps {
  eventId: string;
}

const RegisterStudentToEvent: React.FC<RegisterStudentToEventProps> = ({ eventId }) => {
  const [isRegistered, setRegister] = useState<boolean | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const handleCloseRegister = () => setShowModalRegister(false);
  const handleShowRegister = () => setShowModalRegister(true);

  const eventManager = useContext(eventServiceContext);
  const studentRepository = useContext(StudentContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkIfRegistered = () => {
      eventManager.isStudentRegistered(user?.id, eventId).then((isRegistered) => {
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
    eventManager
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
    <>
      {isRegistered ? (
        <Button variant="secondary" disabled>
          רשום
        </Button>
      ) : (
        <Button variant="primary" onClick={handleRegister}>
          הירשם
        </Button>
      )}
      <RegisterWindow />
    </>
  );
};

export default RegisterStudentToEvent;
