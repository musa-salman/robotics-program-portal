import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Grid,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Register } from './Register';

interface AcademicFormProps {
  setRegister: React.Dispatch<React.SetStateAction<Register>>;
  register: Register;
  isForward:boolean;
}

const AcademicForm: React.FC<AcademicFormProps> = ({ setRegister, register ,isForward}) => {
  // const options = [
  //   'אני מתעניינת ב-5 יח"ל מכטרוניקה',
  //   'אני מתעניינת ב-10 יח"ל מכטרוניקה',
  //   'עדיין לא ידוע',
  //   'אחרת'
  // ];
  const [isValid,setIsValid]  = useState({
    studentSchool: true,
    studyUnitsMajor: true,
    numStudyUnitsMath: true,
  });


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setRegister((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '600px', margin: 'auto', mt: 5 }}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="שם בית הספר"
          name="studentSchool"
          value={register.studentSchool}
          onChange={handleChange}
          required
          error={!isValid.studentSchool || (isForward && register.studentSchool === '')}
          onBlur={()=>{
            setIsValid((prevData) => ({ ...prevData, studentSchool: register.studentSchool !== '' }));  

          }
          }
          helperText={!isValid.studentSchool || (isForward && register.studentSchool === '') ? 'יש למלה' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon />
              </InputAdornment>
            )
          }}
        />
      </Grid>

      <FormLabel sx={{ fontSize: '30px' }}>התעניינות בהיקף יחידות לימוד במגמה</FormLabel>
      <FormControl 
        error={register.studyUnitsMajor === ''}
          
        >
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="studyUnitsMajor"
          value={register.studyUnitsMajor}
          onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label='אני מתעניינת ב-5 יח"ל מכטרוניקה' required />
          <FormControlLabel value="1" control={<Radio />} label='אני מתעניינת ב-10 יח"ל מכטרוניקה' required />
          <FormControlLabel value="2" control={<Radio />} label="עדיין לא ידוע" required />
          <FormControlLabel value="3" control={<Radio />} label="אחרת" required />
        </RadioGroup>
        <FormHelperText>{register.studyUnitsMajor === '' ? 'נה לבחור' : ''}</FormHelperText>
      </FormControl>

      <FormLabel sx={{ fontSize: '30px' }}>מספר יחידות לימוד במתמטיקה</FormLabel>
      <FormControl 
        error={register.numStudyUnitsMath === ''}
        
        >

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="numStudyUnitsMath"
          value={register.numStudyUnitsMath}
          onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label="3" />
          <FormControlLabel value="1" control={<Radio />} label="4" />
          <FormControlLabel value="2" control={<Radio />} label="5" />
          <FormControlLabel value="3" control={<Radio />} label="אחרת" />
        </RadioGroup>

        <FormHelperText>{register.numStudyUnitsMath === ''? 'נה לבחור' : ''}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default AcademicForm;
