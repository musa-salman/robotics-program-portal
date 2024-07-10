import { useState } from 'react';
// import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { Category } from '../../repository/Category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './CategoryManagement.css';
import { useMaterialService } from '../../repository/StudyMaterialContext';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';

interface CategoryManagementProps {
  categories: Category[] | null;
  handleCloseCategoryManagement: () => void;
  handleSelect: (eventKey: string | null) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  handleCloseCategoryManagement ,
  setCategories,
  handleSelect
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState<Category | null>(null);
  const [showFirstButton, setShowFirstButton] = useState(true);
  const [isForward, setIsForward] = useState(false);
  const studyMaterialManagement = useMaterialService();
  const [isValid, setIsValid] = useState({
    category: true
  });

  const handleEditItem = (editedCategory: Category) => {
    console.log("edit c ",editedCategory.category," id ",editedCategory.id);
    if (showFirstButton) {
      setShowFirstButton(false);
      setUpdatedCategory(editedCategory);
    }
  };

  const handleInputCategories = (event: any) => {
    console.log(newCategory);
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

  const addCategories = async () => {
    console.log("new ",newCategory);
    if(newCategory === ""){
      setIsForward(true);
      console.log('you should fill this felid');
    }
    else if (checkRepeat(newCategory)) {
      const docRef = await studyMaterialManagement.categoryRepository.create({ category: newCategory });
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
    } else {
      setIsForward(true);
      console.log('you already have it');
    }
  };

  const handleSaveItem = (item: Category) => {
    console.log("1",categories);
    console.log("save c ",item.category," id ",item.id);
    console.log("select",selectedCategory);
    if (!checkRepeat(selectedCategory) && selectedCategory !== item.category) {
      console.log('this action dose not exist');
    } else if (item.category === updatedCategory?.category && selectedCategory !== '') {
      const edit: Category = {
        category: selectedCategory,
        id: item.id
      };
      studyMaterialManagement.categoryRepository.update(item.id, edit);
     
      setCategories((prevCategories) => {
        if (prevCategories === null) {
          return null;
        }
        return prevCategories.map((category) => (category.id === updatedCategory.id ? edit : category));
      });
      console.log(categories);
      setShowFirstButton(true);
      setUpdatedCategory(null);
      setSelectedCategory('');
    } else {
      console.log('this action dose not exist');
      setShowFirstButton(true);
      setUpdatedCategory(null);
      setSelectedCategory('');
    }
  };

  const handleEditInput = (event: any) => {
    
    setSelectedCategory(event.target.value);
  };

  const handleDeleteCategory = (item: Category) => {
    console.log("delete ",item);
    studyMaterialManagement.categoryRepository.delete(item.id);

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
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '35rem',
          boxShadow: 24,
          backgroundColor:'black',//FIXME:
          p: 4,
          borderRadius: 1,
          outline: 'none',
        }}
      >
        <Typography id="modal-modal-title" variant="h1" sx={{ fontSize: '40px', border: 'none', textAlign: 'center' }}>
         הוספה/שינוי 
        </Typography>
        <form className="my-3">
          <Grid container spacing={3} sx={{justifyContent: 'center'}} >
            <Grid xs={10}>
              <TextField
                fullWidth
                className='mt-4'
                label="קטגוריה"
                value={newCategory}
                onChange={handleInputCategories}
                error={!isValid.category || isForward}
                  onBlur={() => {
                    setIsValid((prevData) => ({ ...prevData, category: newCategory !== '' }));
                  }}
                  helperText={
                    (!isValid.category || isForward) 
                      ? 'יש למלה'
                      : ''
                  }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <Button variant="contained" onClick={addCategories}> שמירה</Button>                                        
                    </InputAdornment>
                  ),
                }}
              />
              
            </Grid>
            
            {(categories || [])
            .filter((item) => item.category !== 'הכל')
            .map((item) => (
              <>
              <Grid xs={8} key={item.id} className='mt-4 pt-3 mx-5 modal-footer-scroll'>
                <TextField
                  fullWidth
                  label="קטגוריה"
                  defaultValue={item.category}
                  // value={updatedCategory?.category === item.category ? updatedCategory.category : ''}
                  onChange={ handleEditInput}
                  disabled={updatedCategory?.category !== item.category}
                  error={(!isValid.category || isForward) && updatedCategory?.category === item.category}
                  onBlur={() => {
                    setIsValid((prevData) => ({ ...prevData, category: updatedCategory?.category !== '' }));
                  }}
                  helperText={
                    ((!isValid.category || isForward) && updatedCategory?.category === item.category) 
                      ? 'יש למלה'
                      : ''
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {item.category !== updatedCategory?.category ? (
                          <Button onClick={() => handleEditItem(item)} >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Button>
                        ) : (
                          <Button onClick={() => handleSaveItem(item)}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                          </Button>
                        )}  
                        <Button  onClick={() => handleDeleteCategory(item)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>             
                      </InputAdornment>
                    ),
                  }}
                />
              
              </Grid> 
              
              </>
            
            ))}
            <Grid xs={5}>
              <Button variant="contained" className='px-5 mt-3 mx-5' onClick={handleCloseCategoryManagement}>סגירה</Button>
            </Grid>
            
          </Grid>
        </form>
      </Box>
    </>
  );
};

export { CategoryManagement };
