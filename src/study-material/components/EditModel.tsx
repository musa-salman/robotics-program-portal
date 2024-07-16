import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment
} from '@mui/material';
import { useEffect, useState } from 'react';
import { StudyMaterial } from '../repository/StudyMaterial';
import { generateMaterialDescription, suggestMaterialTitles } from './upload-file/StudyMaterialPrompts';
import GPT from '../../gpt-service/GPTComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CategoryManagement } from './upload-file/CategoryManagement';
import { Category } from '../repository/Category';
import { useMaterialService } from '../repository/StudyMaterialContext';

interface EditModalProps {
  handleClose: () => void;
  handleSave: () => void;
  handleInputChange: (e: any) => void;
  handleFileChange: (e: any) => void;
  studyMaterial: StudyMaterial;
}

const EditModal: React.FC<EditModalProps> = ({
  handleClose,
  handleSave,
  studyMaterial,
  handleInputChange,
  handleFileChange
}) => {
  const [isValid, setIsValid] = useState({
    filename: true,
    id: true,
    category: true,
    title: true,
    description: true
  });
  const [isForward, setIsForward] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const handleCloseCategoryManagement = () => setShowCategoryManagement(false);
  const handleShowCategoryManagement = () => setShowCategoryManagement(true);
  const [loading, setLoading] = useState<boolean>(true);

  const studyMaterialManagement = useMaterialService();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data: Category[] = await studyMaterialManagement.categoryRepository.find();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (loading && categories === null) {
      getCategory();
      setLoading(false);
    }
  }, [categories]);

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  return (
    <>
      <div className="form-show">
        <div className="form">
          <Modal open={Boolean(open)} onClose={handleClose}>
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
                borderRadius: 1,
                outline: 'none'
              }}>
              <Typography
                id="modal-modal-title"
                variant="h1"
                sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
                העלת קובץ
              </Typography>
              <form style={{ marginTop: '0.25rem' }}>
                <Grid container spacing={3}>
                  <Grid item xs={11.6}>
                    <GPT
                      initialValue={studyMaterial.title}
                      getData={() => suggestMaterialTitles(studyMaterial)}
                      options={{ simplify: false, improve: false, shorten: false }}>
                      <TextField
                        fullWidth
                        label="כותרת"
                        name="title"
                        defaultValue={studyMaterial.title}
                        onChange={handleInputChange}
                        required
                        error={!isValid.title || isForward}
                        onBlur={() => {
                          setIsValid((prevData) => ({ ...prevData, title: studyMaterial.title !== '' }));
                        }}
                        helperText={!isValid.title ? 'יש למלה' : ''}
                      />
                    </GPT>
                  </Grid>

                  <Grid item xs={5.2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-autowidth-label">בחר מיקום</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={studyMaterial.category}
                        name="category"
                        label="בחר מיקום"
                        onChange={handleInputChange}
                        required
                        MenuProps={MenuProps}
                        error={!isValid.category || isForward}
                        onBlur={() => {
                          setIsValid((prevData) => ({ ...prevData, title: studyMaterial.category !== '' }));
                        }}>
                        {(categories || [])
                          // .filter((item) => item.category !== 'הכל')
                          .map((item) => (
                            <MenuItem value={item.category}>{item.category}</MenuItem>
                          ))}
                        <Button
                          onClick={handleShowCategoryManagement}
                          style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', fontSize: '1.1rem' }}>
                          {' '}
                          הוספה/שינוי
                        </Button>
                      </Select>
                      <FormHelperText>{studyMaterial.category === '' || isForward ? 'נה לבחור' : ''}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid xs={6.8}>
                    <TextField
                      style={{ marginTop: '1.50rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                      fullWidth
                      disabled
                      value={studyMaterial.filename}
                      placeholder="שם קובץ"
                      error={!isValid.filename || isForward}
                      onBlur={() => {
                        setIsValid((prevData) => ({ ...prevData, title: studyMaterial.filename !== '' }));
                      }}
                      helperText={!isValid.filename ? 'יש למלה' : ''}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              accept="*"
                              style={{ display: 'none' }}
                              id="upload-file"
                              type="file"
                              onChange={handleFileChange}
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

                  <Grid xs={12} style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                    <GPT
                      initialValue={studyMaterial.description}
                      getData={() => generateMaterialDescription(studyMaterial)}>
                      <TextField
                        name="description"
                        label="תיאור"
                        placeholder="הכנס תיאור כאן"
                        defaultValue={studyMaterial.description}
                        variant="outlined"
                        fullWidth
                        onChange={handleInputChange}
                        margin="normal"
                        multiline
                        rows={5}
                      />
                    </GPT>
                  </Grid>

                  <Grid xs={7} style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                    <Button
                      variant="contained"
                      style={{ marginRight: '8rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                      onClick={handleSave}>
                      {studyMaterial ? 'שמור' : 'הוסף'}
                    </Button>
                  </Grid>

                  <Grid xs={5} style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                    <Button
                      variant="contained"
                      style={{ marginRight: '2rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                      onClick={handleClose}>
                      סגירה
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Modal
                open={showCategoryManagement}
                onClose={handleCloseCategoryManagement}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <CategoryManagement
                  categories={categories}
                  handleCloseCategoryManagement={handleCloseCategoryManagement}
                  setCategories={setCategories}
                  handleSelect={() => {}}
                />
              </Modal>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EditModal;
