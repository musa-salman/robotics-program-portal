import { Box, Typography, TextField, Button } from '@mui/material';

function Contact() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        צור קשר
      </Typography>
      <form noValidate autoComplete="off">
        <Box mb={2}>
          <TextField label="שם" variant="outlined" fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="אימייל" variant="outlined" fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="הודעה" multiline rows={4} variant="outlined" fullWidth />
        </Box>
        <Button variant="contained" color="primary">
          שלח הודעה
        </Button>
      </form>
    </Box>
  );
}

export default Contact;
