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



interface MaterialUploadModalProps {
  handleClose: () => void;
  handleAdd: (studyMaterial: StudyMaterial) => void;
}

const MaterialUploadModal: React.FC<MaterialUploadModalProps> = ({ handleClose, handleAdd }) => {
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

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial>({
    filename: '',
    id: '',
    category: '',
    title: '',
    description: '',
    date: new Date()
  });
  const storageService = useContext(StorageServiceContext);

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

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setStudyMaterial((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setStudyMaterial((prevData) => ({ ...prevData, filename: event.target.files[0].name }));
        setFile(event.target.files[0]);
      }
    } catch (error: any) {
      console.error('error handling file change', error);
    }
  };

  const handleSubmit = async () => {
    
    if(studyMaterial.title !== "" && studyMaterial.filename !== "" && studyMaterial.category !== "" && file !== null){
      studyMaterialManagement.studyMaterialRepository.create(studyMaterial).then((docRef) => {
        storageService.upload(file, '/study-material/' + docRef.id + '-' + studyMaterial.filename);
      });
      handleAdd(studyMaterial);
      handleClose();
    } else {
      setIsForward(true);
    }

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);

    // if (file !== null && studyMaterial.title !== '') {
    //   studyMaterial.category = selectedItem;

    // }
    console.log('studyMaterial', studyMaterial);
  };

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
          backgroundColor:'black',
          p: 4,
          borderRadius: 1,
          outline: 'none'
        }}>
        <Typography id="modal-modal-title" variant="h1" sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
          העלת קובץ
        </Typography>
        <form className="mt-4">
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
                  helperText={!isValid.title ? 'יש למלה' : ''}
                />
              </GPT>
            </Grid>

            <Grid item xs={5.2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">בחר מיקום</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={studyMaterial.category}
                  name="category"
                  label="בחר מיקום"
                  onChange={handleInput}
                  required
                  error={!isValid.category || isForward}
                  onBlur={() => {
                    setIsValid((prevData) => ({ ...prevData, title: studyMaterial.category !== '' }));
                  }}>
                  {(categories || [])
                    .filter((item) => item.category !== 'הכל')
                    .map((item) => (
                      <MenuItem value={item.category}>{item.category}</MenuItem>
                    ))}
                  <Button onClick={handleShowCategoryManagement} className="px-5 mx-5">
                    {' '}
                    הוספה/שינוי
                  </Button>
                </Select>
                <FormHelperText>{studyMaterial.category === '' || isForward ? 'נה לבחור' : ''}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid xs={6.8}>
              <TextField
                className="mt-4 px-4"
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

            <Grid xs={12} className=" px-4">
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
                />
              </GPT>
            </Grid>

            <Grid xs={7} className='px-5 mt-3' >
                <Button variant="contained" className='px-5 mx-5' onClick={handleSubmit}>העלה</Button>
            </Grid>

            <Grid xs={5} className='px-5 mt-3'>
                <Button variant="contained" className='px-5' onClick={handleClose}>סגירה</Button>
            </Grid>

          </Grid>
        </form>
        <Modal
          
          open={showCategoryManagement}
          onClose={handleCloseCategoryManagement}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
