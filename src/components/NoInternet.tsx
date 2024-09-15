import React from 'react';
import { Container, Typography } from '@mui/material';
import './NoInternet.css';

const NoInternet: React.FC = () => {
  return (
    <Container maxWidth="lg" className="container">
      <Typography variant="h3" component="h1" gutterBottom className="header">
        אופס! חיבור אינטרנט לא נמצא
      </Typography>
      <Typography variant="h6" gutterBottom>
        אל תדאגו, רובוטים לא צריכים אינטרנט כדי להשתלט על העולם!
      </Typography>
      <Typography variant="body1">עד שהאינטרנט יחזור, שמרו על קור רוח ובנו על!</Typography>
    </Container>
  );
};

export default NoInternet;
