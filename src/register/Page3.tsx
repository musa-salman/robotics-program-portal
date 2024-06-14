import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button, Autocomplete, FormLabel, Grid, InputAdornment } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Register } from './Register';

interface Page3ComponentProps {
    setPage3Register: React.Dispatch<React.SetStateAction<Page3Register>>;
    page3Register: Page3Register;
}


const Page3Component: React.FC<Page3ComponentProps> = ({setPage3Register,page3Register}) => {
  
  const [mathUnits, setMathUnits] = useState('');
  const [value, setValue] = useState('');

  const options = [
    'אני מתעניינת ב-5 יח"ל מכטרוניקה',
    'אני מתעניינת ב-10 יח"ל מכטרוניקה',
    'עדיין לא ידוע',
    'אחרת'
  ];

  const handleChange = (event:any) => {
    setValue((event.target as HTMLInputElement).value);
    // const { name, value } = event.target;
    setPage3Register((prevData) => ({ ...prevData, 
      studentSchool: event.target.value,
      studyUnitsMajor: options[parseInt(value,10)],
      numStudyUnitsMath: options[parseInt(value,10)]
       }));
    console.log(page3Register);
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
                value={page3Register.studentSchool}
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
          value={page3Register.numStudyUnitsMath}
          onChange={handleChange}
        >
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
          <FormControlLabel value="אחרת" control={<Radio />} label="אחרת" />
        </RadioGroup>
      </FormControl>
      
 
    </Box>
  );
};

export default Page3Component;
