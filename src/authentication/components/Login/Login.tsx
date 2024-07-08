import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../services/useAuth';
import { Login } from '@mui/icons-material';

const LoginButton: React.FC = () => {
  const { authService } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    setLoading(true);
    authService
      .loginWithGoogle()
      .then(() => {
        const redirectTo = '/';
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
    <Button variant="contained" color="primary" onClick={handleLogin} startIcon={<Login />} disabled={loading}>
      {loading ? 'מתחבר...' : 'התחברות'}
    </Button>
  );
};

export default LoginButton;
