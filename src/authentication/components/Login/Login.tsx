import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../services/useAuth';
import { CardContent, Typography, TextField, Card, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * Renders the login component.
 * Allows users to log in to the system using email and password, or Google.
 */
export default function Login() {
  const { user, authService } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    setError('');
    setLoading(true);
    const creds: { email: string; password: string } = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || ''
    };

    await authService
      .loginWithEmailAndPassword(creds)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setError('כניסה נכשלה, נסה שוב.');
        setLoading(false);
      });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      {user && <Navigate to="/" />}
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            כניסה למערכת
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              label='דוא"ל'
              variant="standard"
              fullWidth
              margin="normal"
              inputRef={emailRef}
              error={error.length !== 0}
              required
            />
            <TextField
              id="password"
              label="סיסמה"
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              fullWidth
              margin="normal"
              inputRef={passwordRef}
              onKeyDown={(event) => {
                if (event.getModifierState('CapsLock')) {
                  setWarning('כפתור הנעילה על אותיות גדולות מופעל');
                } else {
                  setWarning('');
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),

                onKeyDown: (event) => {
                  if (event.getModifierState('CapsLock')) {
                    setWarning('כפתור הנעילה על אותיות גדולות מופעל');
                  } else {
                    setWarning('');
                  }
                }
              }}
              error={error.length !== 0}
              required
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading} style={{ marginTop: '1rem' }}>
              התחבר/י
            </Button>
            {error && (
              <Alert severity="error" style={{ marginTop: '1rem' }}>
                {error}
              </Alert>
            )}
            {warning && (
              <Alert severity="warning" style={{ marginTop: '1rem' }}>
                {warning}
              </Alert>
            )}
            <hr />
            <Button
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faGoogle} />}
              onClick={() =>
                authService
                  .loginWithGoogle()
                  .then(() => {
                    setLoading(false);
                  })
                  .catch(() => {
                    setError('כניסה נכשלה, נסה שוב.');
                    setLoading(false);
                  })
              }
              style={{ marginTop: '1rem' }}>
              התחבר/י באמצעות גוגל
            </Button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/forget-password">שכחחתי סיסימה?</Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
