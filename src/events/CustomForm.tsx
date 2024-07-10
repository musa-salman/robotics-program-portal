import moment from 'moment';
import React from 'react';
import { Button, TextField, FormControl, Box, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type CustomFormProps = {
  handleSaveAdd: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetailsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCloseAddEvent: () => void;
  formData: any; // Replace 'any' with the actual type of formData
  MAX_CHARS_Title: number;
  MAX_CHARS_Details: number;
  requiredFields: {
    add: boolean;
  };
};

const CustomForm: React.FC<CustomFormProps> = ({
  handleSaveAdd,
  handleTitleChange,
  handleDateChange,
  handleImageChange,
  handleDetailsChange,
  handleCloseAddEvent,
  formData,
  MAX_CHARS_Title,
  MAX_CHARS_Details,
  requiredFields
}) => (
  <form>
    <FormControl fullWidth margin="normal">
      <TextField
        required={true}
        label="כותרת"
        type="text"
        placeholder="שם אירוע"
        onChange={handleTitleChange}
        inputProps={{ maxLength: MAX_CHARS_Title }}
        defaultValue={formData.title}
        variant="outlined"
        helperText={`${formData.title.length}/${MAX_CHARS_Title} אותיות`}
      />
    </FormControl>

    <FormControl fullWidth margin="normal">
      <TextField
        required={true}
        label="תאריך"
        type="date"
        placeholder="יום/חודש/שנה"
        onChange={handleDateChange}
        defaultValue={moment(formData.date).format('YYYY-MM-DD')}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
    <FormControl fullWidth margin="normal">
      <InputAdornment position="start">
        <input accept="image/*" style={{ display: 'none' }} id="file" type="file" onChange={handleImageChange} />
        <label htmlFor="file">
          <Button variant="contained" component="label" htmlFor="file">
            <CloudUploadIcon />
            העלאת תמונה
          </Button>
        </label>
      </InputAdornment>
    </FormControl>
    <FormControl fullWidth margin="normal">
      <TextField
        required={true}
        label="פרטים"
        multiline
        rows={3}
        placeholder="פרטי האירוע"
        onChange={handleDetailsChange}
        inputProps={{ maxLength: MAX_CHARS_Details }}
        defaultValue={formData.details}
        variant="outlined"
        helperText={`${formData.details.length}/${MAX_CHARS_Details} אותיות`}
      />
    </FormControl>
    <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleCloseAddEvent}>
        סגור
      </Button>
      <Button variant="contained" color="primary" onClick={handleSaveAdd}>
        {requiredFields.add ? 'הוסף' : 'שמור שינויים'}
      </Button>
    </Box>
  </form>
);

export default CustomForm;
