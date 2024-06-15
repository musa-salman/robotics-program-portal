import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials';
import { useState, useEffect, useContext } from 'react';
import './StudyMaterialContainer.css';
import { StudyMaterialContext } from './repository/StudyMaterialContext';
import { StudyMaterial } from './StudyMaterial';
import { SearchBar } from './SearchBar';
import UploadFileComponent from '../upload-file/UploadFile';
import { Modal } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import NoResultFound from './NoResultFound';
import { Map as ImmutableMap } from 'immutable';
import MoveList from './MoveList';
import EmptyStudyMaterials from './EmptyStudyMaterials';
import SuccessAlerts from './Success';
// import { Category } from '@mui/icons-material';

function StudyMaterialContainer() {
  const [studyMaterials, setStudyMaterials] = useState<ImmutableMap<string, StudyMaterial[]> | null>(null);
  const studyMaterialRepository = useContext(StudyMaterialContext);

  const [searchResults, setSearchResults] = useState<ImmutableMap<string, StudyMaterial[]> | null>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getStudyMaterials = async () => {
      setStudyMaterials(await studyMaterialRepository.getStudyMaterialsByCategory());
    };

    if (studyMaterials === null) getStudyMaterials();
  }, [studyMaterials]);

  const handleUpdate = (updatedMaterial: StudyMaterial) => {
    if (!studyMaterials) return;

    const categoryMaterials = studyMaterials.get(updatedMaterial.category.category) || [];
    const updatedMaterials = categoryMaterials.map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    );

    console.log('########', categoryMaterials === updatedMaterials);

    const updatedStudyMaterials = studyMaterials.set(updatedMaterial.category.category, updatedMaterials);
    console.log('%%%%%%%%%', updatedStudyMaterials === studyMaterials);
    setStudyMaterials(updatedStudyMaterials);
  };

  const handleDelete = (studyMaterial: StudyMaterial) => {
    const updatedMaterials = (studyMaterials?.get(studyMaterial.category.category) || []).filter(
      (material) => material.id !== studyMaterial.id
    );
    studyMaterials?.set(studyMaterial.category.category, updatedMaterials);
    setStudyMaterials(studyMaterials);
  };

  const handleAdd = (studyMaterial: StudyMaterial) => {
    studyMaterials?.get(studyMaterial.category.category)?.push(studyMaterial);
    setStudyMaterials(studyMaterials);
  };

  const handleMove = (updatedMaterial: StudyMaterial, oldCategory: string) => {
    ///
    const oldCategoryMaterials = (studyMaterials?.get(oldCategory) || []).filter(
      (material) => material.id !== updatedMaterial.id
    );
    studyMaterials?.set(oldCategory, oldCategoryMaterials);

    const newCategoryMaterials = studyMaterials?.get(updatedMaterial.category.category) || [];
    newCategoryMaterials.push(updatedMaterial);
    // studyMaterials?.set(updatedMaterial.category.category, newCategoryMaterials);
    // setStudyMaterials(new Map(studyMaterials));
  };

  if (studyMaterials === null) {
    return <>loading</>;
  }

  // if (studyMaterials.size === 0) {
  //   return <EmptyStudyMaterials handleAdd={handleAdd} />;
  // }

  const getKeys = () => {
    if (studyMaterials) {
      return Array.from(studyMaterials.keys());
    }
    return [];
  };

  const categories = getKeys();
  const choose = searchResults ? searchResults : studyMaterials;

  console.log(studyMaterials);
  console.log('the search result ', searchResults);
  console.log('the choose', choose);

  return (
    <>
      <div className="btn-search">
        {/* <SearchBar
          // studyMaterials={studyMaterials || {}}
          // onSearchResults={setSearchResults}
          query={query}
          setQuery={setQuery}
        /> */}
        <Fab className="adde-btn" aria-label="add" onClick={handleShow}>
          <AddIcon />
        </Fab>
      </div>
      {searchResults?.size === 0 ? (
        <NoResultFound />
      ) : (
        Array.from(choose.entries()).map(([key, value]) => (
          <Card className="primary" key={key}>
            <Card.Header className="Card-Header">
              <div>
                <h2>{key}</h2>
              </div>
              <Fab className="edit-button" aria-label="edit">
                <EditIcon />
              </Fab>
            </Card.Header>
            <br></br>
            <Card.Body className="body">
              <br></br>
              <div className="study-materials-container">
                {value.map((material) => (
                  <StudyMaterials
                    key={material.id}
                    studyMaterial={material}
                    categories={categories}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onMove={handleMove}
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
    </>
  );
}
export default StudyMaterialContainer;
