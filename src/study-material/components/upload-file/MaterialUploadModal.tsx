import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Grid,
  InputAdornment,
  FormHelperText,
  Modal
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useContext, useEffect, useState } from 'react';
import './MaterialUploadModal.css';
import { Category } from '../../repository/Category';
import { StudyMaterial } from '../../repository/StudyMaterial';
import { CategoryManagement } from './CategoryManagement';
import { StorageServiceContext } from '../../../storage-service/StorageContext';
import GPT from '../../../gpt-service/GPTComponent';
import { generateMaterialDescription, suggestMaterialTitles } from './StudyMaterialPrompts';
import { useMaterialService } from '../../repository/StudyMaterialContext';
import FeedbackSnackbar, { FeedbackMessage } from '../../../components/snackbar/SnackBar';
import MaterialCardPreview from '../MaterialCardPreview';

interface MaterialUploadModalProps {
  handleClose: () => void;
  handleAdd: (studyMaterial: StudyMaterial) => void | null;
  initialValue: StudyMaterial | null;
}

const MaterialUploadModal: React.FC<MaterialUploadModalProps> = ({ handleClose, handleAdd, initialValue }) => {
  const [isForward, setIsForward] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const handleCloseCategoryManagement = () => setShowCategoryManagement(false);
  const handleShowCategoryManagement = () => setShowCategoryManagement(true);
  const studyMaterialManagement = useMaterialService();
  const [isValid, setIsValid] = useState({
    filename: true,
    id: true,
    category: true,
    title: true,
    description: true
  });
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

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial>(
    initialValue || {
      filename: '',
      id: '',
      category: '',
      title: '',
      description: '',
      date: new Date()
    }
  );
  const storageService = useContext(StorageServiceContext);

  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState(0);

  const MAX_CHARS_Title = 17;
  const MAX_CHARS_Details = 100;

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

  if (loading) {
    return <div>Loading...</div>;
  }

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setStudyMaterial((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setStudyMaterial((prevData) => ({ ...prevData, filename: event.target.files[0].name }));
        setFile(event.target.files[0]);
        showMessage({
          message: 'הקובץ נטען בהצלחה',
          variant: 'success'
        });
      }
    } catch (error: any) {
      showMessage({
        message: 'שגיאה בהעלאת הקובץ',
        variant: 'error'
      });
    }
  };

  const handleSubmit = async () => {
    if (studyMaterial.title !== '' && studyMaterial.filename !== '' && studyMaterial.category !== '' && file !== null) {
      studyMaterialManagement.studyMaterialRepository
        .create(studyMaterial)
        .then((docRef) => {
          storageService.upload(file, '/study-material/' + docRef.id + '-' + studyMaterial.filename);
          studyMaterial.id = docRef.id;
          handleAdd(studyMaterial);
          showMessage({
            message: 'הקובץ הועלה בהצלחה',
            variant: 'success'
          });
        })
        .catch(() => {
          showMessage({
            message: 'שגיאה בהעלאת הקובץ',
            variant: 'error'
          });
        });
      handleClose();
    } else {
      setIsForward(true);
    }
  };

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
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
        <Typography id="modal-modal-title" variant="h1" sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
          העלת קובץ
        </Typography>
        <form style={{ marginTop: '0.25rem' }}>
          <div className="card">
            <Grid xs={12} md={4}>
              <MaterialCardPreview studyMaterial={studyMaterial} />
            </Grid>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={11.6}>
              <GPT
                initialValue=""
                getData={() => suggestMaterialTitles(studyMaterial)}
                options={{ simplify: false, improve: false, shorten: false }}>
                <TextField
                  fullWidth
                  label="כותרת"
                  name="title"
                  value={studyMaterial.title}
                  onChange={handleInput}
                  required
                  error={!isValid.title || isForward}
                  onBlur={() => {
                    setIsValid((prevData) => ({ ...prevData, title: studyMaterial.title !== '' }));
                  }}
                  helperText={!isValid.title ? 'יש למלה' : `${studyMaterial.title.length}/${MAX_CHARS_Title} אותיות`}
                  inputProps={{ maxLength: MAX_CHARS_Title }}
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
                  onChange={handleInput}
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
                        accept="image/*,.pdf,.ppt,.pptx,.zip"
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
              <GPT initialValue="" getData={() => generateMaterialDescription(studyMaterial)}>
                <TextField
                  name="description"
                  label="תיאור"
                  placeholder="הכנס תיאור כאן"
                  variant="outlined"
                  fullWidth
                  onChange={handleInput}
                  margin="normal"
                  multiline
                  rows={5}
                  helperText={`${studyMaterial.description.length}/${MAX_CHARS_Details} אותיות`}
                  inputProps={{ maxLength: MAX_CHARS_Details }}
                />
              </GPT>
            </Grid>

            <Grid xs={7} style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
              <Button
                variant="contained"
                style={{ marginRight: '8rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                onClick={handleSubmit}>
                {initialValue ? 'שמור' : 'הוסף'}
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
    </>
  );
};

export default MaterialUploadModal;
