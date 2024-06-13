import React, { useState } from 'react';
import { TextField, Grid, Button, Container, Typography, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import IdIcon from '@mui/icons-material/Badge'; // Icon for ID

const Page2Component = () => {
  const [formData, setFormData] = useState({
    parentEmail: '',
    studentEmail: '',
    parentPhone: '',
    address: '',
    firstName: '',
    lastName: '',
    studentId: '',
    studentPhone: '',
    schoolName: ''
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <Container>

      <form onSubmit={handleSubmit} className='mt-5'>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="שם פרטי"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="שם משפחה"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="טלפון הורה"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="פלאפון תלמיד\ה"
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="תעודת זהות תלמיד"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IdIcon />
                        </InputAdornment>
                        ),
                    }}  
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Email address של אחד ההורים"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Email תלמיד\ה"
                    name="studentEmail"
                    value={formData.studentEmail}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="כתובת מגורים"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <HomeIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" startIcon={<PersonIcon />}>
                שלח
                </Button>
            </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Page2Component;
