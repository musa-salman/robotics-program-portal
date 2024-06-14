import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button, Autocomplete, FormLabel, Grid, InputAdornment } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Register } from './Register';

interface Page3ComponentProps {
  setRegister: React.Dispatch<React.SetStateAction<Register>>;
  register: Register;
}


const Page3Component: React.FC<Page3ComponentProps> = ({setRegister,register}) => {
  
  const [mathUnits, setMathUnits] = useState('');
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');

  const options = [
    'אני מתעניינת ב-5 יח"ל מכטרוניקה',
    'אני מתעניינת ב-10 יח"ל מכטרוניקה',
    'עדיין לא ידוע',
    'אחרת'
  ];

  const handleChange = (event:any) => {
    setValue((event.target as HTMLInputElement).value);
    setValue1((event.target as HTMLInputElement).value);
    // const { name, value } = event.target;
    setRegister((prevData) => ({ ...prevData, 
      studentSchool: event.target,
      studyUnitsMajor: options[parseInt(value,10)],
      numStudyUnitsMath: options[parseInt(value1,10)]
       }));
    // console.log(register);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Handle form submission logic
    // console.log(formData);
  };


 
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2,maxWidth: '600px', margin: 'auto', mt: 5 }}>
      
        <Grid item xs={4}>
            <TextField
                fullWidth
                label="שם בית הספר"
                name="studentSchool"
                value={register.studentSchool}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SchoolIcon />
                    </InputAdornment>
                    ),
                }}
            />
        </Grid>
      
      <FormControl>
      <FormLabel  sx={{fontSize:'30px'}} >התעניינות בהיקף יחידות לימוד במגמה
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="studyUnitsMajor"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="0" control={<Radio />} label='אני מתעניינת ב-5 יח"ל מכטרוניקה' />
        <FormControlLabel value="1" control={<Radio />} label='אני מתעניינת ב-10 יח"ל מכטרוניקה' />
        <FormControlLabel value="2" control={<Radio />} label='עדיין לא ידוע' />
        <FormControlLabel value="3" control={<Radio />} label='אחרת' />
      </RadioGroup>
    </FormControl>

    <FormLabel  sx={{fontSize:'30px'}} >מספר יחידות לימוד במתמטיקה
 
    </FormLabel>
      
      <FormControl component="fieldset" required>
        <RadioGroup
          name='numStudyUnitsMath'
          value={value1}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="3" />
          <FormControlLabel value="1" control={<Radio />} label="4" />
          <FormControlLabel value="2" control={<Radio />} label="5" />
          <FormControlLabel value="3" control={<Radio />} label="אחרת" />
        </RadioGroup>
      </FormControl>
      
 
    </Box>
  );
};

export default Page3Component;
