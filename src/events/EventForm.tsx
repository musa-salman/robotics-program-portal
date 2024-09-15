import { Box, Typography, Button, TextField, Grid, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GPT from '../gpt-service/GPTComponent';
import { generateEventDescription, suggestEventTitles } from './EventPrompts';
import moment, { Moment } from 'moment';
import './EventForm.css';
import { useState } from 'react';
import EventCardPreview from './EventCardPreview';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers';

/**
 * Props for the EventForm component.
 *
 * @interface EventFormProps
 * @property {() => void} handleSaveAdd - Callback function for saving and adding event.
 * @property {(event: React.ChangeEvent<HTMLTextAreaElement>) => void} handleTitleChange - Callback function for handling title change.
 * @property {(event: Moment) => void} handleStartDateChange - Callback function for handling start date change.
 * @property {(event: Moment) => void} handleEndDateChange - Callback function for handling end date change.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} handleImageChange - Callback function for handling image change.
 * @property {(event: React.ChangeEvent<HTMLTextAreaElement>) => void} handleDetailsChange - Callback function for handling details change.
 * @property {() => void} handleCloseAddEvent - Callback function for closing add event.
 * @property {any} formData - The data for the form. Replace 'any' with the actual type of formData.
 * @property {number} MAX_CHARS_Title - The maximum number of characters allowed for the title.
 * @property {number} MAX_CHARS_Details - The maximum number of characters allowed for the details.
 * @property {{ add: boolean }} requiredFields - Object containing the required fields for adding an event.
 * @property {boolean} isForward - Indicates if the event is moving forward.
 */
interface EventFormProps {
  handleSaveAdd: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleStartDateChange: (event: Moment) => void;
  handleEndDateChange: (event: Moment) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetailsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCloseAddEvent: () => void;
  formData: any; // Replace 'any' with the actual type of formData
  MAX_CHARS_Title: number;
  MAX_CHARS_Details: number;
  requiredFields: {
    add: boolean;
  };
  isForward: boolean;
}

/**
 * Represents a form for creating or editing an event.
 *
 * @component
 * @example
 * ```tsx
 * <EventForm
 *   handleSaveAdd={handleSaveAdd}
 *   handleTitleChange={handleTitleChange}
 *   handleStartDateChange={handleStartDateChange}
 *   handleEndDateChange={handleEndDateChange}
 *   handleImageChange={handleImageChange}
 *   handleDetailsChange={handleDetailsChange}
 *   handleCloseAddEvent={handleCloseAddEvent}
 *   formData={formData}
 *   MAX_CHARS_Title={MAX_CHARS_Title}
 *   MAX_CHARS_Details={MAX_CHARS_Details}
 *   requiredFields={requiredFields}
 *   isForward={isForward}
 * />
 * ```
 */
const EventForm: React.FC<EventFormProps> = ({
  handleSaveAdd,
  handleTitleChange,
  handleStartDateChange,
  handleEndDateChange,
  handleImageChange,
  handleDetailsChange,
  handleCloseAddEvent,
  formData,
  MAX_CHARS_Title,
  MAX_CHARS_Details,
  requiredFields,
  isForward
}) => {
  const [formDataTemp, setFormDataTemp] = useState(formData);
  const [isValid, setIsValid] = useState({
    details: true,
    title: true
  });

  function handleTitleChangeTemp(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormDataTemp({ ...formDataTemp, title: event.target.value });
    handleTitleChange(event);
  }

  function handleStartDateChangeTemp(event: Moment | null) {
    if (event) {
      setFormDataTemp((prevState: any) => ({ ...prevState, StartDate: event.toDate() }));
      handleStartDateChange(event);
    }
  }

  function handleEndDateChangeTemp(event: Moment | null) {
    if (event) {
      setFormDataTemp((prevState: any) => ({ ...prevState, endDate: event.toDate() }));
      handleEndDateChange(event);
    }
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
                      startDate={formDataTemp.date}
                      endDate={formDataTemp.endDate}
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
                      required
                      label="כותרת"
                      type="text"
                      placeholder="שם אירוע"
                      onChange={handleTitleChangeTemp}
                      inputProps={{ maxLength: MAX_CHARS_Title }}
                      defaultValue={formData.title}
                      variant="outlined"
                      error={!isValid.title || isForward}
                      onBlur={() => {
                        setIsValid((prevData) => ({ ...prevData, title: formData.title !== '' }));
                      }}
                      // helperText={isValid.title ? 'יש למלה' : ''}
                      helperText={`${formData.title.length}/${MAX_CHARS_Title} אותיות`}
                    />
                  </GPT>
                </Grid>
                <Grid xs={5}>
                  <LocalizationProvider adapterLocale={'he'} dateAdapter={AdapterMoment}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        label="תאריך התחלה"
                        onChange={handleStartDateChangeTemp}
                        defaultValue={moment(formData.StartDate)}
                      />
                    </DemoContainer>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        label="תאריך סיום"
                        onChange={handleEndDateChangeTemp}
                        defaultValue={moment(formData.endDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid xs={6.6}>
                  <TextField
                    style={{ marginTop: '0.75rem', marginLeft: '1.50rem', marginRight: '1.50rem' }}
                    fullWidth
                    disabled
                    placeholder="שם תמונה"
                    value={formData.imageURL}
                    helperText={'יש לבחור רק תמונה'}
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
                      required
                      label="פרטים"
                      multiline
                      rows={3}
                      placeholder="פרטי האירוע"
                      onChange={handleDetailsChangeTemp}
                      inputProps={{ maxLength: MAX_CHARS_Details }}
                      defaultValue={formData.details}
                      variant="outlined"
                      error={!isValid.details || isForward}
                      onBlur={() => {
                        setIsValid((prevData) => ({ ...prevData, details: formData.details !== '' }));
                      }}
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
