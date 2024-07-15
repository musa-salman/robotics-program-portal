import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { StudyMaterial } from '../repository/StudyMaterial';
import FeedbackSnackbar, { FeedbackMessage } from '../../components/snackbar/SnackBar';
import { generateMaterialDescription, suggestMaterialTitles } from './upload-file/StudyMaterialPrompts';
import GPT from '../../gpt-service/GPTComponent';

interface EditModalProps {
  handleClose: () => void;
  handleSave: () => void;
  handleDetailsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  studyMaterial: StudyMaterial;
}

const EditModal: React.FC<EditModalProps> = ({
  handleClose,
  handleSave,
  studyMaterial,
  handleDetailsChange,
  handleTitleChange
}) => {
  return (
    <>
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
                שינוי חומרי למידה
              </Typography>
              <form>
                <Grid container spacing={3} sx={{ marginLeft: '0.25rem', marginRight: '0.25rem' }}>
                  <Grid xs={11}>
                    <GPT
                      initialValue={studyMaterial.title}
                      getData={() => suggestMaterialTitles(studyMaterial)}
                      options={{ simplify: false, improve: false, shorten: false }}>
                      <TextField
                        fullWidth
                        required={true}
                        label="כותרת"
                        type="text"
                        placeholder="שם אירוע"
                        onChange={handleTitleChange}
                        defaultValue={studyMaterial.title}
                        variant="outlined"
                      />
                    </GPT>
                  </Grid>
                  <Grid xs={11}>
                    <GPT
                      initialValue={studyMaterial.description}
                      getData={() => generateMaterialDescription(studyMaterial)}
                      options={{ simplify: true, improve: true, shorten: true }}>
                      <TextField
                        fullWidth
                        required={true}
                        label="פרטים"
                        multiline
                        rows={3}
                        placeholder="פרטי האירוע"
                        onChange={handleDetailsChange}
                        defaultValue={studyMaterial.description}
                        variant="outlined"
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
                      onClick={handleClose}>
                      סגור
                    </Button>
                  </Grid>
                  <Grid xs={5} sx={{ marginTop: '0.75rem' }}>
                    <Button
                      variant="contained"
                      style={{ paddingLeft: '1.50rem', paddingRight: '1.50rem' }}
                      onClick={handleSave}>
                      {'שמור שינויים'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
