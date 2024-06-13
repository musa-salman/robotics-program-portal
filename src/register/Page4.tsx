import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Button, Autocomplete, FormLabel, Grid, InputAdornment } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Page4Component = () => {
  const [schoolName, setSchoolName] = useState('');
  const [interest, setInterest] = useState('');
  const [additionalSubject, setAdditionalSubject] = useState('');
  const [mathUnits, setMathUnits] = useState('');
  const [value, setValue] = React.useState('female');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission
    console.log({ schoolName, interest, additionalSubject, mathUnits });
  };

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const options = [
    'בית הספר',
    'עלון מנח"י',
    'קרוב משפחה שלמד במגמה',
    'חיפוש עצמי באינטרנט',
    'אחרת'
  ];
  return (
    <>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2,maxWidth: '600px', margin: 'auto', mt: 5 }}>
      
            <FormControl>
                <FormLabel  sx={{fontSize:'30px'}} >איך שמעתם עלינו?
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="0" control={<Radio />} label='בית הספר' />
                    <FormControlLabel value="1" control={<Radio />} label='עלון מנח"י' />
                    <FormControlLabel value="2" control={<Radio />} label='קרוב משפחה שלמד במגמה' />
                    <FormControlLabel value="3" control={<Radio />} label='חיפוש עצמי באינטרנט' />
                    <FormControlLabel value="4" control={<Radio />} label='אחרת' />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel  sx={{fontSize:'30px'}} >שאלות נוספות ניתן לכתוב פה או לפנות במייל או בטלפון שפורמסמו בתחילת העמוד.
                </FormLabel>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    // label="שם פרטי"
                    name="firstName"
                    
                    onChange={handleChange}
                    required
                    
                />
            </Grid>
            </FormControl>

        <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
    </>
  );
};

export default Page4Component;
