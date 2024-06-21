import { useRef, useState } from 'react';
import { useAuth } from '../../services/useAuth';
import { Alert, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import SimpleSnackbar from '../../../components/snackbar/SnackBar';

/**
 * Renders a component for password recovery.
 *
 * @returns JSX.Element
 */
export default function ForgetPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { authService } = useAuth();
  const [error, setError] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    setError('');

    authService
      .generatePasswordResetLink(emailRef.current!.value)
      .then(() => setIsSuccess(true))
      .catch((reason) => {
        setError('שליחת הקישור נכשלה, נסה שוב.');
        console.error(reason);
      });
  }

  return (
    <>
      {isSuccess && <SimpleSnackbar message="נשלח לך קישור לאיפוס סיסמה" />}

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            שכחת סיסמה?
          </Typography>
          <Typography variant="body1" gutterBottom>
            הזן את כתובת הדוא"ל שלך ונשלח לך קישור לאיפוס סיסמה
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label='דוא"ל'
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              inputRef={emailRef}
            />
            <Button type="submit" variant="contained" color="primary">
              שלח
            </Button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </CardContent>
      </Card>
    </>
  );
}
