import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../services/useAuth';
import { Login } from '@mui/icons-material';
import FeedbackSnackbar, { FeedbackMessage } from '../../../components/snackbar/SnackBar';

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
