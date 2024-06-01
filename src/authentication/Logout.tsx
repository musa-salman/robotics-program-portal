import { Button, Alert } from 'react-bootstrap';
import { useAuth } from './useAuth';
import { useState } from 'react';

const LogoutButton = () => {
  const { authService } = useAuth();
  const [error, setError] = useState('');

  return (
    <>
      <Button
        variant="danger"
        onClick={() =>
          authService
            .logout()
            .then(() => window.location.reload())
            .catch((error) => {
              console.error(error);
              setError('ישנה בעיה בהתנתקות מהמערכת. אנא נסה שוב מאוחר יותר.');
            })
        }>
        התנתק
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
};

export default LogoutButton;
