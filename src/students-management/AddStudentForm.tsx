import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './StudentsManagement.css';
import { Student } from './Student';

interface AddStudentFormProps {
  onAddItem: (student: Student) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddItem: onAddStudent }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [motherEmail, setMotherEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({ firstName, lastName, studentEmail, motherEmail } as Student);
    setFirstName('');
    setLastName('');
    setStudentEmail('');
    setMotherEmail('');
  };

  return (
    <Paper className="add-student-form">
      <form onSubmit={handleSubmit}>
        <TextField
          label="שם פרטי"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="שם משפחה"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label='דוא"ל תלמיד'
          type="email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label='דוא"ל אם'
          type="email"
          value={motherEmail}
          onChange={(e) => setMotherEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          הוסף
        </Button>
      </form>
    </Paper>
  );
};

export default AddStudentForm;
