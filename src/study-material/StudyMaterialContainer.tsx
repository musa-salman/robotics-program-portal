import Card from 'react-bootstrap/Card';
import MaterialCard from './MaterialCard';
import { useState, useEffect, useContext } from 'react';
import './StudyMaterialContainer.css';
import { MaterialContext } from './repository/StudyMaterialContext';
import { StudyMaterial } from './StudyMaterial';
import { SearchBar } from './SearchBar';
import UploadFileComponent from '../upload-file/UploadFile';
import { Modal } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import NoResultFound from './NoResultFound';
import SettingsIcon from '@mui/icons-material/Settings';
import MoveList from './MoveList';
import EmptyStudyMaterials from './EmptyStudyMaterials';
import { Category } from '../upload-file/Category';
import { AddEditCategories } from '../upload-file/addOrEditCategories';

function StudyMaterialContainer() {
  const materialManager = useContext(MaterialContext);

  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
  const [categoryList, setCategoryList] = useState<Category[] | null>(null);

  const [searchResults, setSearchResults] = useState<StudyMaterial[] | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [show, setShow] = useState(false);
  const [showAddEdit, setShowAddEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowEdit = () => setShowAddEdit(true);

  const [query, setQuery] = useState('');

  useEffect(() => {
    const getStudyMaterials = async () => {
      setStudyMaterials(await materialManager.studyMaterialRepository.find());
    };
    const getCategories = async () => {
      setCategoryList(await materialManager.categoryRepository.find());
    };

    if (studyMaterials === null) getStudyMaterials();
    if (categoryList === null) getCategories();
  }, [materialManager, studyMaterials, categoryList]);

  function handleUpdate(updatedMaterial: StudyMaterial) {
    // const updatedMaterials = (studyMaterials || []).map((material) =>
    //   material.id === updatedMaterial.id ? updatedMaterial : material
    // );
    // setStudyMaterials(updatedMaterials);
    // console.log(updatedMaterials == studyMaterials );

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

  const handledoNothing = () => {};

  const handleMoveClick = (studyMaterial: StudyMaterial) => {
    setSelectedMaterial(studyMaterial);
    setIsMoveMode(true);
  };

  const handleMove = (categorySelected: Category) => {
    materialManager
      .moveStudyMaterial(selectedMaterial!, categorySelected.category)
      .then(() => {
        setIsMoveMode(false);
        const updatedStudyMaterials = studyMaterials!.map((material) =>
          material.id === selectedMaterial!.id ? { ...material, category: categorySelected.category } : material
        );
        setStudyMaterials(updatedStudyMaterials);
      })
      .catch((error) => {
        console.error('Error move study material:', error);
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

  // console.log(studyMaterials);
  // console.log('categories', categories);
  return (
    <>
      {isMoveMode && (
        <MoveList
          categories={categoryList || []}
          onMove={handleMove}
          onCancel={() => setIsMoveMode(false)}
          // isMoveMode={isMoveMode}
        />
      )}
      <div className="btn-search">
        <SearchBar
          studyMaterials={studyMaterials || []}
          onSearchResults={setSearchResults}
          query={query}
          setQuery={setQuery}
        />
        <div className="btns">
          <Fab className="edit-button" aria-label="edit" onClick={handleShowEdit}>
            <SettingsIcon />
          </Fab>
          <Fab className="adde-btn" aria-label="add" onClick={handleShow}>
            <AddIcon />
          </Fab>
        </div>
      </div>
      {searchResults?.length === 0 ? (
        <NoResultFound />
      ) : (
        (categories || []).map((category) => (
          <Card className="primary" key={category}>
            <Card.Header className="Card-Header">
              <h2>{category}</h2>
            </Card.Header>
            <br></br>
            <Card.Body className="body">
              <br></br>
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
            </Card.Body>
          </Card>
        ))
      )}
      <Modal show={show} onHide={handleClose}>
        <UploadFileComponent handleClose={handleClose} handleAdd={handleAdd} />
      </Modal>

      <Modal show={showAddEdit} onHide={handleCloseAddEdit}>
        <AddEditCategories
          categories={categoryList}
          handleCloseAddEdit={handleCloseAddEdit}
          setCategories={setCategoryList}
          handleSelect={handledoNothing}
        />
      </Modal>
    </>
  );
}
export default StudyMaterialContainer;
