import { IconButton, Typography } from '@mui/material';
import { useAuth } from '../services/useAuth';
import { useState } from 'react';
import FeedbackSnackbar, { FeedbackMessage } from '../../components/snackbar/SnackBar';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { authService } = useAuth();
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      <IconButton
        onClick={() =>
          authService
            .logout()
            .then(() => {
              setMessage({
                message: 'התנתקת בהצלחה',
                variant: 'success'
              });
              navigate('/splash');
            })
            .catch((error) => {
              setMessage({
                message: error.message,
                variant: 'error'
              });
              setBuildNumber(buildNumber + 1);
            })
        }>
        <ExitToApp fontSize="medium" />
        <Typography variant="h6">התנתק</Typography>
      </IconButton>
    </>
  );
};

export default LogoutButton;
