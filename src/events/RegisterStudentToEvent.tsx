import { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { eventManagerContext } from './repository/EventManagerContext';
import { AuthContext } from '../authentication/AuthContext';

interface RegisterStudentToEventProps {
  eventId: string;
}

const RegisterStudentToEvent: React.FC<RegisterStudentToEventProps> = ({ eventId }) => {
  const [isRegistered, setRegister] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState<BriefStudent[] | null>(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const handleCloseRegister = () => setShowModalRegister(false);
  const handleShowRegister = () => setShowModalRegister(true);

  const eventManager = useContext(eventManagerContext);
  const { user } = useContext(AuthContext);

  const student: BriefStudent = {
    id: user?.id || '',
    name: 'getName()',
    email: 'getEmail()',
    phone: 'getPhone()'
  };

  useEffect(() => {
    const getRegisteredStudents = async () => {
      setRegister(await eventManager.isStudentRegistered(student.id, eventId));
    };

    if (registeredStudents === null) getRegisteredStudents();
    if (registeredStudents !== null) checkIfRegistered();
  }, [registeredStudents]);

  function handleRegister() {
    handleShowRegister();
  }

  ///FIXME: get user id
  const checkIfRegistered = async () => {
    if (registeredStudents?.some((registeredStudent) => registeredStudent.id === student.id)) {
      setRegister(true);
    }
    //FIXME:
    // setRegister(await eventManager.isStudentRegistered(student.id, eventId));
  };

  const handleSaveRegister = async () => {
    setShowModalRegister(false);
    if (registeredStudents && !registeredStudents.find((user) => user.id === student.id) && eventId !== '') {
      eventManager.registerStudentForEvent(student, eventId);
      registeredStudents?.push(student);
      setRegister(true);
    }
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
