import { Box, Typography, Button, TextField, Grid, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GPT from '../gpt-service/GPTComponent';
import { generateEventDescription, suggestEventTitles } from './EventPrompts';
import moment from 'moment';

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
  return (
    <>
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
        <Typography id="modal-modal-title" variant="h1" sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
          שינוי אירוע
        </Typography>
        <form className="mt-3">
          <Grid container spacing={3} className="mx-1">
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
                  onChange={handleTitleChange}
                  inputProps={{ maxLength: MAX_CHARS_Title }}
                  defaultValue={formData.title}
                  variant="outlined"
                  helperText={`${formData.title.length}/${MAX_CHARS_Title} אותיות`}
                />
              </GPT>
            </Grid>

            <Grid xs={4}>
              <TextField
                className="mt-3"
                required={true}
                fullWidth
                label="תאריך"
                type="date"
                placeholder="יום/חודש/שנה"
                onChange={handleDateChange}
                defaultValue={moment(formData.date).format('YYYY-MM-DD')}
              />
            </Grid>

            <Grid xs={6.6}>
              <TextField
                className="mx-4 mt-3"
                fullWidth
                disabled
                placeholder="שם קובץ"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <input
                        accept="*"
                        style={{ display: 'none' }}
                        id="upload-file"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="upload-file">
                        <Button variant="contained" component="label" htmlFor="upload-file">
                          <CloudUploadIcon />
                          לעלות קובץ
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
                  onChange={handleDetailsChange}
                  inputProps={{ maxLength: MAX_CHARS_Details }}
                  defaultValue={formData.details}
                  variant="outlined"
                  helperText={`${formData.details.length}/${MAX_CHARS_Details} אותיות`}
                />
              </GPT>
            </Grid>

            <Grid xs={7} className=" mt-3">
              <Button variant="contained" className="px-5 mx-5" onClick={handleCloseAddEvent}>
                סגור
              </Button>
            </Grid>

            <Grid xs={5} className="mt-3">
              <Button variant="contained" className="px-5" onClick={handleSaveAdd}>
                {requiredFields.add ? 'הוסף' : 'שמור שינויים'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default EventForm;
