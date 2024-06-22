import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/useAuth';
import { Button, Snackbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

/**
 * Renders the login component.
 * Allows users to log in to the system using Google.
 */
export default function Login() {
  const { user, authService } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setError('');
    setLoading(true);
    authService
      .loginWithGoogle()
      .catch(() => {
        setError('כניסה נכשלה, נסה שוב.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {user && <Navigate to="/" />}
      <Button
        variant="contained"
        color="primary"
        startIcon={<FontAwesomeIcon icon={faGoogle} />}
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{ marginTop: '1rem' }}>
        התחבר/י באמצעות גוגל
      </Button>
      {error !== '' && (
        <Snackbar open={true} message={error} color="red" autoHideDuration={6000} onClose={() => setError('')} />
      )}
    </>
  );
}
