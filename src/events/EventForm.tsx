import { Box, Typography, Button, TextField, Grid, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GPT from '../gpt-service/GPTComponent';
import { generateEventDescription, suggestEventTitles } from './EventPrompts';
import moment from 'moment';
import './EventForm.css';
import { useState } from 'react';
import EventCardPreview from './EventCardPreview';

interface EventFormProps {
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
}

const EventForm: React.FC<EventFormProps> = ({
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
}) => {
  const [formDataTemp, setFormDataTemp] = useState(formData);

  function handleTitleChangeTemp(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormDataTemp({ ...formDataTemp, title: event.target.value });
    handleTitleChange(event);
  }

  function handleDateChangeTemp(event: React.ChangeEvent<HTMLInputElement>) {
    setFormDataTemp({ ...formDataTemp, date: event.target.value });
    handleDateChange(event);
  }
  function handleDetailsChangeTemp(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormDataTemp({ ...formDataTemp, details: event.target.value });
    handleDetailsChange(event);
  }

  function handleImageChangeTemp(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setFormDataTemp({ ...formDataTemp, image: objectUrl });
      handleImageChange(event);
    }
  }
  return (
    <div className="form-show">
      <div className="form">
        <form>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '45rem',
              boxShadow: 24,
              backgroundColor: 'background.paper',
              p: 4,
              borderRadius: 1
            }}>
            <Typography
              id="modal-modal-title"
              variant="h1"
              sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
              שינוי אירוע
            </Typography>
            <form>
              <Grid container spacing={3} sx={{ marginLeft: '0.25rem', marginRight: '0.25rem' }}>
                <div className="card">
                  <Grid xs={12} md={4}>
                    <EventCardPreview
                      date={formDataTemp.date}
                      title={formDataTemp.title}
                      details={formDataTemp.details}
                      image={formDataTemp.image ? formDataTemp.image : './DefultEventImg.png'}
                    />
                  </Grid>
                </div>
                <Grid xs={11}>
                  <GPT
                    initialValue={formData.title}
                    getData={() => suggestEventTitles(formData)}
                    options={{ simplify: false, improve: false, shorten: false }}>
                    <TextField
                      fullWidth
                      required={true}
                      label="כותרת"
                      type="text"
                      placeholder="שם אירוע"
                      onChange={handleTitleChangeTemp}
                      inputProps={{ maxLength: MAX_CHARS_Title }}
                      defaultValue={formData.title}
                      variant="outlined"
                      helperText={`${formData.title.length}/${MAX_CHARS_Title} אותיות`}
                    />
                  </GPT>
                </Grid>

                <Grid xs={4}>
                  <TextField
                    style={{ marginTop: '0.75rem' }}
                    required={true}
                    fullWidth
                    label="תאריך"
                    type="date"
                    placeholder="יום/חודש/שנה"
                    onChange={handleDateChangeTemp}
                    defaultValue={moment(formData.date).format('YYYY-MM-DD')}
                  />
                </Grid>

                <Grid xs={6.6}>
                  <TextField
                    style={{ marginTop: '0.75rem', marginLeft: '1.50rem', marginRight: '1.50rem' }}
                    fullWidth
                    disabled
                    placeholder="שם תמונה"
                    value={formData.imageURL}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-file"
                            type="file"
                            onChange={handleImageChangeTemp}
                          />
                          <label htmlFor="upload-file">
                            <Button variant="contained" component="label" htmlFor="upload-file">
                              <CloudUploadIcon />
                              לעלות תמונה
                            </Button>
                          </label>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid xs={11}>
                  <GPT
                    initialValue={formData.details}
                    getData={() => generateEventDescription(formData)}
                    options={{ simplify: true, improve: true, shorten: true }}>
                    <TextField
                      fullWidth
                      required={true}
                      label="פרטים"
                      multiline
                      rows={3}
                      placeholder="פרטי האירוע"
                      onChange={handleDetailsChangeTemp}
                      inputProps={{ maxLength: MAX_CHARS_Details }}
                      defaultValue={formData.details}
                      variant="outlined"
                      helperText={`${formData.details.length}/${MAX_CHARS_Details} אותיות`}
                    />
                  </GPT>
                </Grid>

                <Grid xs={7} sx={{ marginTop: '0.75rem' }}>
                  <Button
                    variant="contained"
                    style={{
                      marginLeft: '1.50rem',
                      marginRight: '1.50rem',
                      paddingLeft: '1.50rem',
                      paddingRight: '1.50rem'
                    }}
                    onClick={handleCloseAddEvent}>
                    סגור
                  </Button>
                </Grid>
                <Grid xs={5} sx={{ marginTop: '0.75rem' }}>
                  <Button
                    variant="contained"
                    style={{ paddingLeft: '1.50rem', paddingRight: '1.50rem' }}
                    onClick={handleSaveAdd}>
                    {requiredFields.add ? 'הוסף' : 'שמור שינויים'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
