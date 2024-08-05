import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the NotFoundPage component.
 *
 * This component displays a page with a message indicating that the requested page was not found.
 * It provides a button to navigate back to the home page.
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 5, marginBottom: '20px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        אופס! איבדנו את העמוד
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        זה לא המקום שרצית להיות בו. אולי הרובוטים שלנו לקחו פנייה לא נכונה?
      </Typography>
      <Button variant="contained" color="primary" startIcon={<HomeIcon />} onClick={handleHomeClick} sx={{ mt: 2 }}>
        חזרה לדף הבית
      </Button>
    </Container>
  );
};

export default NotFoundPage;
