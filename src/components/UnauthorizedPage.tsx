import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import RobotIcon from '@mui/icons-material/Android';
import HomeIcon from '@mui/icons-material/Home';
import './UnauthorizedPage.css';
import { useAuth } from '../authentication/services/useAuth';
import LoginButton from '../authentication/components/Login/Login';

/**
 * Renders the UnauthorizedPage component.
 *
 * This component is responsible for displaying a page indicating that the user is unauthorized.
 * It shows a message in Hebrew stating that the user does not have the required permissions.
 * If the user is not logged in, it displays a login button. Otherwise, it displays a button to go back to the home page.
 *
 * @returns The UnauthorizedPage component.
 */
const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Container className="unauthorized-container">
      <RobotIcon className="robotIcon" />
      <Typography variant="h2" gutterBottom>
        401 לא מורשה
      </Typography>
      <Typography variant="h5" gutterBottom>
        אופס! נראה שאין לך את ההרשאות הנדרשות.
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user == null ? 'אפילו רובוטים צריכים הרשאות.' : 'אפילו רובוטים עם גישה צריכים אישור נוסף.'} אולי כדאי לפנות
        למנהל המערכת?
      </Typography>

      {user === null ? (
        <LoginButton />
      ) : (
        <Button variant="contained" color="primary" startIcon={<HomeIcon />} className="button" onClick={handleGoHome}>
          חזור לדף הבית
        </Button>
      )}
    </Container>
  );
};

export default UnauthorizedPage;
