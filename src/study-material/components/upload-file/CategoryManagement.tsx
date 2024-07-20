import { useState } from 'react';
// import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { Category } from '../../repository/Category';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CategoryManagement.css';
import { useMaterialService } from '../../repository/StudyMaterialContext';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import FeedbackSnackbar, { FeedbackMessage } from '../../../components/snackbar/SnackBar';
import DeleteModal from '../../DeleteModal';

interface CategoryManagementProps {
  categoryList: Category[] | null;
  handleCloseCategoryManagement: () => void;
  handleSelect: (eventKey: string | null) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categoryList,
  handleCloseCategoryManagement,
  handleSelect
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState<Category | null>(null);
  const [showFirstButton, setShowFirstButton] = useState(true);
  const [isForward, setIsForward] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const studyMaterialManagement = useMaterialService();
  const [isValid, setIsValid] = useState({
    category: true
  });

  const [categories, setCategories] = useState<Category[] | null>(categoryList);

  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState(0);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleEditItem = (editedCategory: Category) => {
    if (showFirstButton) {
      setShowFirstButton(false);
      setUpdatedCategory(editedCategory);
    }
  };

  const handleInputCategories = (event: any) => {
    setNewCategory(event.target.value);
  };

  const checkRepeat = (input: string): boolean => {
    let x: number = 0;
    categories?.forEach((index) => {
      if (index.category !== input) {
        x += 1;
      }
    });
    return x === categories?.length;
  };

  const addCategories = () => {
    if (newCategory === '') {
      setIsForward(true);
    } else if (checkRepeat(newCategory)) {
      studyMaterialManagement.categoryRepository
        .create({ category: newCategory })
        .then((docRef) => {
          const add: Category = {
            category: newCategory,
            id: docRef.id
          };
          // handleSelect(add.category);
          setCategories((prevCategories) => {
            if (prevCategories === null) {
              return [add];
            }
            return [...prevCategories, add];
          });
          showMessage({
            message: 'הקטגוריה נוספה בהצלחה',
            variant: 'success'
          });
        })
        .catch(() => {
          showMessage({
            message: 'הקטגוריה לא נוספה',
            variant: 'error'
          });
        });
    } else {
      setIsForward(true);
    }
  };

  const handleSaveItem = (item: Category) => {
    if (!checkRepeat(selectedCategory) && selectedCategory !== item.category) {
      showMessage({
        message: 'הקטגוריה קיימת כבר',
        variant: 'error'
      });
    } else if (item.category === updatedCategory?.category && selectedCategory !== '') {
      const edit: Category = {
        category: selectedCategory,
        id: item.id
      };
      studyMaterialManagement
        .renameCategory(item, selectedCategory)
        .then(() => {
          setCategories((prevCategories) => {
            if (prevCategories === null) {
              return null;
            }
            return prevCategories.map((category) => (category.id === updatedCategory.id ? edit : category));
          });
          setShowFirstButton(true);
          setUpdatedCategory(null);
          setSelectedCategory('');
          showMessage({
            message: 'הקטגוריה עודכנה בהצלחה',
            variant: 'success'
          });
        })
        .catch(() => {
          console.log('error', item.category, selectedCategory);
          showMessage({
            message: 'הקטגוריה לא עודכנה',
            variant: 'error'
          });
        });
    } else {
      setShowFirstButton(true);
      setUpdatedCategory(null);
      setSelectedCategory('');
    }
  };

  const handleEditInput = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleDeleteCategory = (item: Category) => {
    studyMaterialManagement
      .deleteCategory(item.id)
      .then(() => {
        showMessage({
          message: 'הקטגוריה נמחקה בהצלחה',
          variant: 'success'
        });
      })
      .catch(() => {
        showMessage({
          message: 'הקטגוריה לא נמחקה',
          variant: 'error'
        });
      });

    setCategories((prevCategories) => {
      if (prevCategories !== null) {
        return prevCategories.filter((category) => category.id !== item.id);
      }
      return null;
    });
    handleSelect('הכל');
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
          width: '35rem',
          boxShadow: 24,
          backgroundColor: 'background.paper',
          p: 4,
          borderRadius: 1,
          outline: 'none'
        }}>
        <Typography id="modal-modal-title" variant="h1" sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
          הוספה/שינוי
        </Typography>
        <form style={{ marginTop: '2rem' }}>
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            <Grid xs={10}>
              <TextField
                fullWidth
                style={{ marginTop: '1rem' }}
                label="קטגוריה"
                value={newCategory}
                onChange={handleInputCategories}
                error={!isValid.category || isForward}
                onBlur={() => {
                  setIsValid((prevData) => ({ ...prevData, category: newCategory !== '' }));
                }}
                helperText={!isValid.category || isForward ? 'יש למלה' : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="contained" onClick={addCategories}>
                        {' '}
                        שמירה
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid xs={8} style={{ height: '18rem', overflow: 'auto', marginTop: '1rem' }}>
              {(categories || [])
                .filter((item) => item.category !== 'הכל')
                .map((item) => (
                  <>
                    {showDeleteModal && <DeleteModal onDelete={()=>{setShowDeleteModal(false);handleDeleteCategory(item);}} onCancel={() => setShowDeleteModal(false)} message={"האם אתה בטוח שברצונך למחוק את קטגוריה הזו"}/>}

                    <Grid xs={11.6} key={item.category} style={{ paddingTop: '1rem' }}>
                      <TextField
                        fullWidth
                        label="קטגוריה"
                        defaultValue={item.category}
                        // value={updatedCategory?.category === item.category ? updatedCategory.category : ''}
                        onChange={handleEditInput}
                        disabled={updatedCategory?.category !== item.category}
                        error={(!isValid.category || isForward) && updatedCategory?.category === item.category}
                        onBlur={() => {
                          setIsValid((prevData) => ({ ...prevData, category: updatedCategory?.category !== '' }));
                        }}
                        helperText={
                          (!isValid.category || isForward) && updatedCategory?.category === item.category
                            ? 'יש למלה'
                            : ''
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {item.category !== updatedCategory?.category ? (
                                <Button onClick={() => handleEditItem(item)}>
                                  <EditIcon />
                                </Button>
                              ) : (
                                <Button onClick={() => handleSaveItem(item)}>
                                  <SaveIcon />
                                </Button>
                              )}
                              <Button onClick={() => setShowDeleteModal(true)}>
                                <DeleteIcon />
                              </Button>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </>
                ))}
            </Grid>
            <Grid xs={5}>
              <Button
                variant="contained"
                style={{ marginTop: '0.75rem', marginRight: '4rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                onClick={handleCloseCategoryManagement}>
                סגירה
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export { CategoryManagement };
