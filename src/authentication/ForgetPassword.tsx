import React, { useState } from 'react';
import {
  Form,
  Button,
  Card,
  Alert,
  FloatingLabel,
  Modal
} from 'react-bootstrap';
import { useAuth } from './AuthContext';

export default function ForgetPassword() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const { generatePasswordResetLink: generatePasswordResetLink } = useAuth();
  const [error, setError] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const handleClose = () => setIsSuccess(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await generatePasswordResetLink(
        emailRef.current!.value,
        () => {
          setIsSuccess(true);
        },
        (reason: string) => {
          setError(reason);
        }
      );
    } catch {
      setError('.כניסה נכשלה, נסה שוב');
    }

    setLoading(false);
  }

  return (
    <>
      <Modal show={isSuccess} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>הקישור נשלח בהצלחה</Modal.Title>
        </Modal.Header>
        <Modal.Body>הקישור לאיפוס הסיסמה נשלח לכתובת הדוא"ל שהזנת.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Body>
          <h2 className="mb-4">שכחת סיסמה?</h2>
          <p>הזן את הדוא"ל שלך ונשלח לך קישור לאיפוס סיסמה</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <FloatingLabel
                controlId="floatingInput"
                label='דוא"ל'
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder='דוא"ל'
                  ref={emailRef}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              שלח
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
