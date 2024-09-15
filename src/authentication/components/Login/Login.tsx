import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../services/useAuth';
import { Login } from '@mui/icons-material';
import FeedbackSnackbar, { FeedbackMessage } from '../../../components/snackbar/SnackBar';

/**
 * LoginButton component.
 *
 * This component renders a button that allows the user to login.
 * It uses the `authService` from the `useAuth` hook to handle the login process.
 * The button displays different text and is disabled based on the `loading` state.
 * It also displays a feedback message using the `FeedbackSnackbar` component.
 *
 * @returns The rendered LoginButton component.
 */
const LoginButton: React.FC = () => {
  const { authService } = useAuth();
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleLogin = () => {
    setLoading(true);
    authService
      .loginWithGoogle()
      .then(() => {
        showMessage({ message: 'התחברת בהצלחה', variant: 'success' });
        const redirectTo = '/';
        window.location.href = redirectTo;
      })
      .catch(() => {
        showMessage({ message: 'שגיאה בהתחברות', variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      <Button variant="contained" color="primary" onClick={handleLogin} startIcon={<Login />} disabled={loading}>
        {loading ? 'מתחבר...' : 'התחברות'}
      </Button>
    </>
  );
};

export default LoginButton;
