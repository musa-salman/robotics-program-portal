import { useState, useEffect } from 'react';
import './StudyMaterialContainer.css';
import { useMaterialService } from './repository/StudyMaterialContext';
import { StudyMaterial } from './repository/StudyMaterial';
import MaterialUploadModal from './components/upload-file/MaterialUploadModal';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CardContent, Modal, Typography } from '@mui/material';
import NoResultFound from './components/NoResultFound';
import SettingsIcon from '@mui/icons-material/Settings';
import { Category } from './repository/Category';
import EmptyStudyMaterials from './components/EmptyStudyMaterials';
import { SearchBar } from './components/SearchBar';
import MaterialCard from './components/MaterialCard';
import CategorySelector from './components/CategorySelector';
import CategoryButtons from './components/CaregoryButtons';
import { CategoryManagement } from './components/upload-file/CategoryManagement';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import Role from '../authentication/components/Roles';

function StudyMaterialContainer() {
  const materialService = useMaterialService();

  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);

  const [categoryList, setCategoryList] = useState<Category[] | null>(null);

  const [searchResults, setSearchResults] = useState<StudyMaterial[] | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [isMoveMode, setIsMoveMode] = useState(false);

  const [show, setShow] = useState(false);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAll, setIsAll] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowEdit = () => setShowAddEdit(true);
  const [query, setQuery] = useState('');

  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);

  useEffect(() => {
    const getStudyMaterials = () => {
      return materialService.studyMaterialRepository
        .find()
        .then((materials) => {
          const sortedMaterials = materials.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setStudyMaterials(sortedMaterials);
        })
        .catch(() => {
          showMessage({
            message: 'התרחשה שגיעה בעת הבאת החומרים. אנא נסה שנית.',
            variant: 'error'
          });
        });
    };
    const getCategories = () => {
      return materialService.categoryRepository
        .find()
        .then((categories) => {
          setCategoryList(categories);
          setSelectedCategories(categories.map((category) => category.category));
        })
        .catch(() => {
          showMessage({
            message: 'התרחשה שגיעה בעת הבאת הקטגוריות. אנא נסה שנית.',
            variant: 'error'
          });
        });
    };
    if (studyMaterials === null) getStudyMaterials();
    if (categoryList === null) getCategories();
  }, [materialService, studyMaterials, categoryList]);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  //Fix this function the use state is not working
  const handleUpdate = (updatedMaterial: StudyMaterial) => {
    const updatedMaterials = (studyMaterials || []).map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    );
    setStudyMaterials(updatedMaterials);
  };

  const handleDelete = (deletedStudy: StudyMaterial) => {
    const updatedMaterials = (studyMaterials || []).filter((material) => material.id !== deletedStudy.id);
    setStudyMaterials(updatedMaterials);
  };

  const handleAdd = (studyMaterial: StudyMaterial) => {
    setStudyMaterials((prevMaterials) => [...(prevMaterials || []), studyMaterial]);
  };

  const handleCategorySelect = (category: string) => {
    // setSelectedCategories([]);
    if (category === 'הכל') {
      setSelectedCategories(categories);
      setIsAll(true);
    } else {
      setSelectedCategories([category]);
      console.log('the selected cat ', selectedCategories);
      setIsAll(false);
    }
  };

  const handleMoveClick = (studyMaterial: StudyMaterial) => {
    setSelectedMaterial(studyMaterial);
    setIsMoveMode(true);
  };

  const handleMove = (categorySelected: Category) => {
    materialService
      .moveStudyMaterial(selectedMaterial!, categorySelected.category)
      .then(() => {
        setIsMoveMode(false);
        const updatedStudyMaterials = studyMaterials!.map((material) =>
          material.id === selectedMaterial!.id ? { ...material, category: categorySelected.category } : material
        );
        setStudyMaterials(updatedStudyMaterials);
        showMessage({
          message: 'החומר הועבר בהצלחה!',
          variant: 'success'
        });
      })
      .catch(() => {
        showMessage({
          message: 'התרחשה שגיעה בעת העברת החומר. אנא נסה שנית.',
          variant: 'error'
        });
      });
  };

  if (studyMaterials === null) {
    return <>loading</>;
  }

  if (studyMaterials.length === 0) {
    return <EmptyStudyMaterials handleAdd={handleAdd} />;
  }

  let categories: string[] = (searchResults || studyMaterials || [])
    .map((s) => s.category)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  categories = ['הכל', ...categories.filter((c) => c !== 'הכל')];

  console.log('catergories', categories);
  console.log('catergory list', categoryList);
  return (
    <>
      {message && <FeedbackSnackbar key={message.message} feedBackMessage={message} />}
      <Box className="mat-out-box">
        <Box className="mat-in-box">
          {isMoveMode && (
            <CategorySelector
              categories={categoryList || []}
              onMove={handleMove}
              onCancel={() => setIsMoveMode(false)}
            />
          )}
          <div className="btn-search">
            <div className="search">
              <SearchBar
                studyMaterials={studyMaterials || []}
                onSearchResults={setSearchResults}
                query={query}
                setQuery={setQuery}
              />
            </div>
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
              <div className="btns">
                <Button variant="outlined" aria-label="edit" onClick={handleShowEdit}>
                  <SettingsIcon />
                </Button>
                <Button variant="contained" aria-label="add" onClick={handleShow}>
                  <AddIcon />
                </Button>
              </div>
            </RoleBasedAccessControl>
          </div>

          <div className="con-taf">
            <CategoryButtons categories={categories || []} onCategorySelect={handleCategorySelect} />
          </div>

          {searchResults?.length === 0 ? (
            <NoResultFound />
          ) : (
            (categories || [])
              .filter((category) => selectedCategories.includes(category))
              .filter((category) => {
                if (category === 'הכל') {
                  return false;
                }
                return true;
              })
              .map((category) => (
                <Box key={category}>
                  <CardContent>
                    {isAll && (
                      <Typography variant="h6" component="h2" style={{ marginBottom: '20px' }}>
                        {category}
                      </Typography>
                    )}
                    <div className="study-materials-container">
                      {(searchResults || studyMaterials || [])
                        .filter((s) => s.category === category)
                        .map((studyMaterial) => (
                          <MaterialCard
                            key={studyMaterial.id}
                            studyMaterial={studyMaterial}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            onMove={handleMoveClick}
                          />
                        ))}
                    </div>
                  </CardContent>
                </Box>
              ))
          )}

          <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <MaterialUploadModal handleClose={handleClose} handleAdd={handleAdd} initialValue={null} />
          </Modal>

          <Modal
            open={showAddEdit}
            onClose={handleCloseAddEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <CategoryManagement
              categories={categoryList}
              handleCloseCategoryManagement={handleCloseAddEdit}
              setCategories={setCategoryList}
              handleSelect={() => {}}
            />
          </Modal>
        </Box>
      </Box>
    </>
  );
}
export default StudyMaterialContainer;
