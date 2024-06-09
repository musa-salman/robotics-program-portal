import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

interface EmptyStateProps {
  onAddStudent: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddStudent }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center">
      <PersonAdd style={{ fontSize: 80 }} color="disabled" />
      <Typography variant="h6" gutterBottom>
        אין תלמידים עדיין
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        לחץ על הכפתור למטה להוספת תלמיד חדש
      </Typography>
      <Button variant="contained" color="primary" startIcon={<PersonAdd />} onClick={onAddStudent}>
        הוסף תלמיד
      </Button>
    </Box>
  );
};

export default EmptyState;
