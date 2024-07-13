import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Register } from '../register/Register';
import { hearAboutUsOptions, studyUnitsMajorOptions } from '../register/info';
import { Student } from '../students-management/Student';
import { hasOwn } from 'groq-sdk/core.mjs';

interface RegisterDetailsProps {
  registrationData: Register | Student;
  onClose: () => void;
}

const StudentDetails: React.FC<RegisterDetailsProps> = ({ registrationData, onClose }) => {
  const isRegister = hasOwn(registrationData, 'hearAboutUs');
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
              שם תלמיד: {registrationData.firstName} {registrationData.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              תעודת זהות: {registrationData.studentId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              כתובת: {registrationData.studentAddress}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              טלפון תלמיד: {registrationData.studentPhoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              אימייל תלמיד: {registrationData.studentEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              טלפון הורה: {registrationData.parentPhoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              אימייל הורה: {registrationData.parentEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              בית ספר: {registrationData.studentSchool}
            </Typography>
          </Grid>
          {isRegister && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  מגמת לימודים: {studyUnitsMajorOptions[Number((registrationData as Register).studyUnitsMajor)]}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  מספר יחידות במתמטיקה: {(registrationData as Register).numStudyUnitsMath}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  איך שמעת עלינו: {hearAboutUsOptions[Number((registrationData as Register).hearAboutUs)]}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  שאלות נוספות: {(registrationData as Register).otherQuestions}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
