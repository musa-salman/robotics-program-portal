import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { Student } from './Student';
import './StudentForm.css';
import { isEmpty, isIdentityCard, isMobilePhone } from 'validator';
import isEmail from 'validator/lib/isEmail';
import { isHebrewOnly } from '../register/InputValidator';
import { School } from '@mui/icons-material';

interface AddStudentFormProps {
  initialItem?: Student;
  saveItem: (student: Student) => void;
}

const StudentForm: React.FC<AddStudentFormProps> = ({ initialItem: initialStudent, saveItem: saveStudent }) => {
  const [student, setStudent] = useState(
    initialStudent ?? {
      id: '',
      studentId: '',
      firstName: '',
      lastName: '',
      studentPhoneNumber: '',
      parentPhoneNumber: '',
      studentEmail: '',
      parentEmail: '',
      studentAddress: '',
      studentSchool: ''
    }
  );

  const [isIdValid, setIsIdValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const [isParentPhoneNumberValid, setIsParentPhoneNumberValid] = useState(true);
  const [isStudentPhoneNumberValid, setIsStudentPhoneNumberValid] = useState(true);
  const [isStudentEmailValid, setIsStudentEmailValid] = useState(true);
  const [isParentEmailValid, setIsParentEmailValid] = useState(true);

  const [isStudentAddressValid, setIsStudentAddressValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveStudent(student);
  };

  return (
    <>
      {/* // <Paper className="student-form"> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className="student-form">
          <Grid item xs={12}>
            <TextField
              label="תעודת זהות"
              value={student.studentId}
              onChange={(e) => setStudent({ ...student, studentId: e.target.value })}
              error={!isIdValid}
              helperText={!isIdValid ? 'יש להזין תעודת זהות תקינה' : ''}
              onBlur={(e) => setIsIdValid(isIdentityCard(e.target.value, 'he-IL'))}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם פרטי"
              value={student.firstName}
              onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
              error={!isFirstNameValid}
              helperText={!isFirstNameValid ? 'יש להזין שם פרטי תקין' : ''}
              onBlur={(e) => setIsFirstNameValid(isHebrewOnly(e.target.value) && !isEmpty(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <PersonIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם משפחה"
              value={student.lastName}
              onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
              error={!isLastNameValid}
              helperText={!isLastNameValid ? 'יש להזין שם משפחה תקין' : ''}
              onBlur={(e) => setIsLastNameValid(isHebrewOnly(e.target.value) && !isEmpty(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <PersonIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="מספר טלפון תלמיד"
              value={student.studentPhoneNumber}
              onChange={(e) => setStudent({ ...student, studentPhoneNumber: e.target.value })}
              error={!isStudentPhoneNumberValid}
              helperText={!isStudentPhoneNumberValid ? 'יש להזין מספר טלפון תקין' : ''}
              onBlur={(e) => setIsStudentPhoneNumberValid(isMobilePhone(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <PhoneIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="מספר טלפון הורה"
              value={student.parentPhoneNumber}
              onChange={(e) => setStudent({ ...student, parentPhoneNumber: e.target.value })}
              error={!isParentPhoneNumberValid}
              helperText={!isParentPhoneNumberValid ? 'יש להזין מספר טלפון תקין' : ''}
              onBlur={(e) => setIsParentPhoneNumberValid(isMobilePhone(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <PhoneIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='דוא"ל תלמיד'
              type="email"
              value={student.studentEmail}
              onChange={(e) => setStudent({ ...student, studentEmail: e.target.value })}
              error={!isStudentEmailValid}
              helperText={!isStudentEmailValid ? 'יש להזין כתובת דוא"ל תקינה' : ''}
              onBlur={(e) => setIsStudentEmailValid(isEmail(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <EmailIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='דוא"ל הורה'
              type="email"
              value={student.parentEmail}
              onChange={(e) => setStudent({ ...student, parentEmail: e.target.value })}
              error={!isParentEmailValid}
              helperText={!isParentEmailValid ? 'יש להזין כתובת דוא"ל תקינה' : ''}
              onBlur={(e) => setIsParentEmailValid(isEmail(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <EmailIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="בית ספר"
              value={student.studentSchool}
              onChange={(e) => setStudent({ ...student, studentSchool: e.target.value })}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <School />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="כתובת תלמיד"
              value={student.studentAddress}
              onChange={(e) => setStudent({ ...student, studentAddress: e.target.value })}
              error={!isStudentAddressValid}
              helperText={!isStudentAddressValid ? 'יש להזין כתובת תקינה' : ''}
              onBlur={(e) => setIsStudentAddressValid(isHebrewOnly(e.target.value) && !isEmpty(e.target.value))}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <HomeIcon />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              שמור
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* </Paper> */}
    </>
  );
};

export default StudentForm;
