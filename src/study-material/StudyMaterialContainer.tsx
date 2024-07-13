import { useState, useEffect } from 'react';
import './StudyMaterialContainer.css';
import { useMaterialService } from './repository/StudyMaterialContext';
import { StudyMaterial } from './repository/StudyMaterial';
import MaterialUploadModal from './components/upload-file/MaterialUploadModal';
import AddIcon from '@mui/icons-material/Add';
import { Box, Card, CardContent, CardHeader, Container, Divider, Fab, Grid, Modal, Typography } from '@mui/material';
import NoResultFound from './components/NoResultFound';
import SettingsIcon from '@mui/icons-material/Settings';
import { Category } from './repository/Category';
import EmptyStudyMaterials from './components/EmptyStudyMaterials';
import { SearchBar } from './components/SearchBar';
import MaterialCard from './components/MaterialCard';
import CategorySelector from './components/CategorySelector';
import DeleteModal from './DeleteModal';
import CategoryButtons from './components/CaregoryButtons';
import { CategoryManagement } from './components/upload-file/CategoryManagement';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowEdit = () => setShowAddEdit(true);
  const [query, setQuery] = useState('');

  // Define the feedback message
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | undefined>(undefined);

  useEffect(() => {
    const getStudyMaterials = async () => {
      setStudyMaterials(await materialService.studyMaterialRepository.find());
    };
    const getCategories = async () => {
      setCategoryList(await materialService.categoryRepository.find());
    };

    if (studyMaterials === null) getStudyMaterials();
    if (categoryList === null) getCategories();
  }, [materialService, studyMaterials, categoryList]);

  function handleUpdate(updatedMaterial: StudyMaterial) {
    const updatedMaterials = (studyMaterials || []).map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    );
    setStudyMaterials(updatedMaterials);
    console.log(updatedMaterials == studyMaterials);

    setStudyMaterials((prevMaterials) => {
      if (!prevMaterials) return [];
      const index = prevMaterials.findIndex((material) => material.id === updatedMaterial.id);
      if (index !== -1) {
        // Create a new array with the updated event
        const newMaterials = [...prevMaterials];
        newMaterials[index] = updatedMaterial;
        return newMaterials;
      }
      // If the event was not found, return the previous state
      return prevMaterials;
    });
  }

  const handleDelete = (deletedStudy: StudyMaterial) => {
    const updatedMaterials = (studyMaterials || []).filter((material) => material.id !== deletedStudy.id);
    setStudyMaterials(updatedMaterials);
  };

  const handleAdd = (studyMaterial: StudyMaterial) => {
    studyMaterials?.push(studyMaterial);
    setStudyMaterials(studyMaterials);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories([]);
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
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
        setFeedbackMessage({
          message: 'החומר הועבר בהצלחה!',
          variant: 'success'
        });
      })
      .catch(() => {
        setFeedbackMessage({
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

  const categories: string[] = (searchResults || studyMaterials || [])
    .map((s) => s.category)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  return (
    <>
      {feedbackMessage && <FeedbackSnackbar key={feedbackMessage.message} feedBackMessage={feedbackMessage} />}
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
            <div className="btns">
              <Fab className="edit-button" aria-label="edit" onClick={handleShowEdit}>
                <SettingsIcon />
              </Fab>
              <Fab className="adde-btn" aria-label="add" onClick={handleShow}>
                <AddIcon />
              </Fab>
            </div>
          </div>

          <div className="con-taf">
            <CategoryButtons categories={categoryList || []} onCategorySelect={handleCategorySelect} />
          </div>

          {searchResults?.length === 0 ? (
            <NoResultFound />
          ) : (
            (categories || [])
              .filter((category) => selectedCategories.includes(category))
              .map((category) => (
                <Box className="primary" key={category}>
                  <CardContent className="body">
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
