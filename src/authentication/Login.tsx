import { useRef, useState } from 'react';
import { Form, Button, Card, Alert, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from './useAuth';

/**
 * Renders the login component.
 * Allows users to log in to the system using email and password, or Google.
 */
export default function Login() {
  const { authService } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [warning, setWarning] = useState('');
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

    authService
      .loginWithEmailAndPassword(creds)
      .then(() => {
        navigate('/dashboard');
        setLoading(false);
      })
      .catch(() => {
        setError('כניסה נכשלה, נסה שוב.');
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="mb-4">כניסה למערכת</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <FloatingLabel controlId="floatingInput" label='דוא"ל' className="mb-3">
                <Form.Control type="email" placeholder='דוא"ל' ref={emailRef} required />
              </FloatingLabel>
            </Form.Group>

            <Form.Control
              type="password"
              placeholder="סיסמה"
              onKeyDown={(event) => {
                if (event.getModifierState('CapsLock')) {
                  setWarning('כפתור הנעילה על אותיות גדולות מופעל');
                } else {
                  setWarning('');
                }
              }}
              ref={passwordRef}
              required
            />
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              התחבר/י
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            {warning && (
              <Alert variant="warning" className="mt-3">
                {warning}
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
                authService
                  .loginWithGoogle()
                  .then(() => {
                    navigate('/dashboard');
                    setLoading(false);
                  })
                  .catch(() => {
                    setError('כניסה נכשלה, נסה שוב.');
                    setLoading(false);
                  })
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
