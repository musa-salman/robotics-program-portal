import { Typography } from '@mui/material';
import { Register } from '../register/Register';

interface RegisterDetailsProps {
  register: Register;
}

const RegisterDetails: React.FC<RegisterDetailsProps> = ({ register }) => {
  return (
    <div>
      <Typography>תעודת זהות: {register.studentId}</Typography>
      <Typography>כתובת: {register.studentAddress}</Typography>
      <Typography>
        שם תלמיד: {register.firstName} {register.lastName}
      </Typography>
      <Typography>טלפון תלמיד: {register.studentPhoneNumber}</Typography>
      <Typography>אימייל תלמיד: {register.studentEmail}</Typography>
      <Typography>טלפון הורה: {register.parentPhoneNumber}</Typography>
      <Typography>אימייל הורה: {register.parentEmail}</Typography>
      <Typography>בית ספר: {register.studentSchool}</Typography>
      <Typography>מגמת לימודים: {register.studyUnitsMajor}</Typography>
      <Typography>מספר יחידות במתמטיקה: {register.numStudyUnitsMath}</Typography>
      <Typography>איך שמעת עלינו: {register.hearAboutUs}</Typography>
      <Typography>שאלות נוספות: {register.otherQuestions}</Typography>
    </div>
  );
};

export default RegisterDetails;
