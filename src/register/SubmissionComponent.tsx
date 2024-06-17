import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Grid,
  FormHelperText
} from '@mui/material';

import { Register } from './Register';

interface Page4ComponentProps {
  setRegister: React.Dispatch<React.SetStateAction<Register>>;
  register: Register;
}

const SubmissionForm: React.FC<Page4ComponentProps> = ({ setRegister, register }) => {
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setRegister((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '600px', margin: 'auto', mt: 5 }}>
        <FormControl error={register.hearAboutUs === ''}>
          <FormLabel sx={{ fontSize: '30px' }}>איך שמעתם עלינו?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="hearAboutUs"
            value={register.hearAboutUs}
            onChange={handleChange}>
            <FormControlLabel value="0" control={<Radio />} label="בית הספר" />
            <FormControlLabel value="1" control={<Radio />} label='עלון מנח"י' />
            <FormControlLabel value="2" control={<Radio />} label="קרוב משפחה שלמד במגמה" />
            <FormControlLabel value="3" control={<Radio />} label="חיפוש עצמי באינטרנט" />
            <FormControlLabel value="4" control={<Radio />} label="אחרת" />
          </RadioGroup>
          <FormHelperText>{register.hearAboutUs === '' ? 'נה לבחור' : ''}</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontSize: '30px' }}>
            שאלות נוספות ניתן לכתוב פה או לפנות במייל או בטלפון שפורמסמו בתחילת העמוד.
          </FormLabel>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="otherQuestions"
              value={register.otherQuestions}
              onChange={handleChange}
              required
            />
          </Grid>
        </FormControl>
      </Box>
    </>
  );
};

export default SubmissionForm;
