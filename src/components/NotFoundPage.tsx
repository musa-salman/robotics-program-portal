import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import RobotImage from '/planet.png';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 5, marginBottom: '20px' }}>
      <Box>
        <img src={RobotImage} alt="Robot" style={{ maxWidth: '90%', height: 'auto' }} />
      </Box>
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
