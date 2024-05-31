import React, { useContext, useState } from 'react';
import { Form, Button, Card, Alert, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from './AuthContext';

export default function Login() {
  const authService = useContext(AuthContext);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    setError('');
    setLoading(true);
    const creds: { email: string; password: string } = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || ''
    };

    authService.authService
      .loginWithEmailAndPassword(creds)
      .then(() => {
        navigate('/dashboard');
        setLoading(false);
      })
      .catch(() => {
        setError('.כניסה נכשלה, נסה שוב');
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="mb-4">כניסה למערכת</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <FloatingLabel
                controlId="floatingInput"
                label='דוא"ל'
                className="mb-3">
                <Form.Control
                  type="email"
                  placeholder='דוא"ל'
                  ref={emailRef}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group id="password">
              <FloatingLabel controlId="floatingPassword" label="סיסמה">
                <Form.Control
                  type="password"
                  placeholder="סיסמה"
                  ref={passwordRef}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              התחבר/י
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <hr />
            <Button
              variant="link"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() =>
                authService.authService
                  .loginWithGoogle()
                  .then(() => navigate('/dashboard'))
                  .catch(() => setError('כניסה נכשלה, נסה שוב'))
              }
              className="w-100 mt-3 mr-4">
              <FontAwesomeIcon icon={faGoogle} className="ms-2" />
              <div className="px-3">התחבר/י באמצעות גוגל</div>
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forget-password">שכחחתי סיסימה?</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
