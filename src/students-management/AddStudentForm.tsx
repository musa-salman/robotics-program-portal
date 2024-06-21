import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import './StudentsManagement.css';
import { Student } from './Student';

interface AddStudentFormProps {
  onAddItem: (student: Student) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddItem: onAddStudent }) => {
  const [id, setId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentPhoneNumber, setStudentPhoneNumber] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [studentAddress, setStudentAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({
      id,
      studentId,
      firstName,
      lastName,
      studentPhoneNumber,
      parentPhoneNumber,
      studentEmail,
      parentEmail,
      studentAddress
    } as Student);
    setId('');
    setStudentId('');
    setFirstName('');
    setLastName('');
    setStudentPhoneNumber('');
    setParentPhoneNumber('');
    setStudentEmail('');
    setParentEmail('');
    setStudentAddress('');
  };

  return (
    <Paper className="add-student-form">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="תעודת זהות"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם פרטי"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={studentPhoneNumber}
              onChange={(e) => setStudentPhoneNumber(e.target.value)}
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
              value={parentPhoneNumber}
              onChange={(e) => setParentPhoneNumber(e.target.value)}
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
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
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
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: <EmailIcon />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="כתובת תלמיד"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
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
              הוסף
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddStudentForm;
