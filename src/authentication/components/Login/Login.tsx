import React, { useState } from 'react';
import { Button, Container, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../../services/useAuth';

const Login: React.FC = () => {
  const { authService } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    setLoading(true);
    authService
      .loginWithGoogle()
      .then(() => {
        const redirectTo = localStorage.getItem('redirectTo') || '/';
        window.location.href = redirectTo;
      })
      .catch(() => {
        setError('כניסה נכשלה, נסה שוב.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          התחברות
        </Typography>
        <Typography variant="body1" paragraph>
          אנא התחבר כדי לגשת לפורטל הרובוטיקה.
        </Typography>
        {error && (
          <Alert severity="error" style={{ marginBottom: 20 }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          {loading ? 'מתחבר...' : 'התחברות'}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
