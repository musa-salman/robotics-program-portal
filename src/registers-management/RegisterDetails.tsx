import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Register } from '../register/Register';

interface RegisterDetailsProps {
  register: Register;
  onClose: () => void;
}

const RegisterDetails: React.FC<RegisterDetailsProps> = ({ register, onClose }) => {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardHeader
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        title="פרטי הרשמה"
        titleTypographyProps={{ variant: 'h5', color: 'primary' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              שם תלמיד: {register.firstName} {register.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              תעודת זהות: {register.studentId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              כתובת: {register.studentAddress}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              טלפון תלמיד: {register.studentPhoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              אימייל תלמיד: {register.studentEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              טלפון הורה: {register.parentPhoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              אימייל הורה: {register.parentEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              בית ספר: {register.studentSchool}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              מגמת לימודים: {register.studyUnitsMajor}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              מספר יחידות במתמטיקה: {register.numStudyUnitsMath}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              איך שמעת עלינו: {register.hearAboutUs}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              שאלות נוספות: {register.otherQuestions}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RegisterDetails;
