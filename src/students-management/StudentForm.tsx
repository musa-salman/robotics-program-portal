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

/**
 * Props for the AddStudentForm component.
 */
interface AddStudentFormProps {
  initialItem?: Student;
  saveItem: (student: Student) => void;
  setShowItemForm: (value: boolean) => void;
}

/**
 * StudentForm component represents a form for adding or editing a student.
 *
 * @component
 * @example
 * ```tsx
 * <StudentForm
 *   initialItem={initialStudent}
 *   saveItem={saveStudent}
 *   setShowItemForm={setShowItemForm}
 * />
 * ```
 */
const StudentForm: React.FC<AddStudentFormProps> = ({
  initialItem: initialStudent,
  saveItem: saveStudent,
  setShowItemForm
}) => {
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
  const [isStudentSchoolValid, setIsStudentSchoolValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    if (
      isIdentityCard(student.studentId, 'he-IL') &&
      isHebrewOnly(student.firstName) &&
      !isEmpty(student.firstName) &&
      isHebrewOnly(student.lastName) &&
      !isEmpty(student.lastName) &&
      isMobilePhone(student.studentPhoneNumber) &&
      isMobilePhone(student.parentPhoneNumber) &&
      isEmail(student.studentEmail) &&
      isEmail(student.parentEmail) &&
      isHebrewOnly(student.studentAddress) &&
      isHebrewOnly(student.studentSchool)
    ) {
      e.preventDefault();
      saveStudent(student);
      setShowItemForm(false);
    } else {
      setIsIdValid(isIdentityCard(student.studentId, 'he-IL'));
      setIsFirstNameValid(isHebrewOnly(student.firstName) && !isEmpty(student.firstName));
      setIsLastNameValid(isHebrewOnly(student.lastName) && !isEmpty(student.lastName));
      setIsStudentPhoneNumberValid(isMobilePhone(student.studentPhoneNumber));
      setIsParentPhoneNumberValid(isMobilePhone(student.parentPhoneNumber));
      setIsStudentEmailValid(isEmail(student.studentEmail));
      setIsParentEmailValid(isEmail(student.parentEmail));
      setIsStudentAddressValid(isHebrewOnly(student.studentAddress) && !isEmpty(student.studentAddress));
      setIsStudentSchoolValid(isHebrewOnly(student.studentSchool) && !isEmpty(student.studentSchool));
    }
  };

  return (
    <>
      {/* // <Paper className="student-form"> */}
      <form onSubmit={handleSubmit} noValidate>
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
              helperText={!isFirstNameValid ? 'אותיות בעברית בלבד' : ''}
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
              helperText={!isLastNameValid ? 'אותיות בעברית בלבד' : ''}
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
              error={!isStudentSchoolValid}
              helperText={!isStudentSchoolValid ? 'אותיות בעברית בלבד' : ''}
              onBlur={(e) => setIsStudentSchoolValid(isHebrewOnly(e.target.value) && !isEmpty(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="כתובת תלמיד"
              value={student.studentAddress}
              onChange={(e) => setStudent({ ...student, studentAddress: e.target.value })}
              error={!isStudentAddressValid}
              helperText={!isStudentAddressValid ? 'אותיות בעברית בלבד' : ''}
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
            {/* <Button type="submit" variant="contained" color="primary" fullWidth>
              שמור
            </Button> */}
          </Grid>
          <Grid xs={7} sx={{ marginTop: '0.75rem' }}>
            <Button
              variant="contained"
              style={{
                marginLeft: '1.50rem',
                marginRight: '8rem',
                paddingLeft: '1.50rem',
                paddingRight: '1.50rem'
              }}
              type="button"
              onClick={handleSubmit}>
              שמור
            </Button>
          </Grid>
          <Grid xs={5} sx={{ marginTop: '0.75rem' }}>
            <Button
              variant="contained"
              style={{ paddingLeft: '1.50rem', paddingRight: '1.50rem', marginRight: '3rem' }}
              onClick={() => setShowItemForm(false)}>
              בטל
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* </Paper> */}
    </>
  );
};

export default StudentForm;
