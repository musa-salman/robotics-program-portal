import React from 'react';
import { Box, Typography } from '@mui/material';

const Headline = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        margin: '20px 0',
        backgroundColor: '#3f51b5',
        color: '#fff',
        padding: '20px 0'
      }}>
      <Typography variant="h2" component="h1">
        Welcome to the Robotics Team
      </Typography>
      <Typography variant="h5" component="p">
        Innovate. Collaborate. Compete.
      </Typography>
    </Box>
  );
};

export default Headline;
