import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const RegisterStudentToEvent: React.FC = () => {
  const [isRegistered, setRegister] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const handleCloseRegister = () => setShowModalRegister(false);
  const handleShowRegister = () => setShowModalRegister(true);

  function handleRegister() {
    handleShowRegister();
  }
  const handleSaveRegister = async () => {
    setShowModalRegister(false);
    setRegister(true);
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
      {registerWindow()}
    </>
  );
};

export default RegisterStudentToEvent;
