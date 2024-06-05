import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials';
import { useState, useEffect, useContext } from 'react';
import './StudyMaterialContainer.css';
import { StudyMaterialContext } from './StudyMaterialContext';
import { StudyMaterial } from './StudyMaterial';
import { SearchBar } from './SearchBar';
import UploadFileComponent from '../upload-file/UploadFile';
import { Modal } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EmptyStudyMaterials from './EmptyStudyMaterials';
import { Fab } from '@mui/material';

function StudyMaterialContainer() {
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
  const studyMaterialRepository = useContext(StudyMaterialContext);

  const [searchResults, setSearchResults] = useState<StudyMaterial[] | null>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getStudyMaterials = async () => {
      setStudyMaterials(await studyMaterialRepository.find());
    };

    if (studyMaterials === null) getStudyMaterials();
  }, [studyMaterials]);

  const handleUpdate = (updatedMaterial: StudyMaterial) => {
    const updatedMaterials = (studyMaterials || []).map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    );
    setStudyMaterials(updatedMaterials);
  };

  const handleDelete = (deletedItemId: string) => {
    const updatedMaterials = (studyMaterials || []).filter((material) => material.id !== deletedItemId);
    setStudyMaterials(updatedMaterials);
  };

  const handleAdd = (studyMaterial: StudyMaterial) => {
    studyMaterials?.push(studyMaterial);
    setStudyMaterials(studyMaterials);
  };

  const categories = (searchResults || studyMaterials || [])
    .map((s) => s.category)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  return (
    <>
      <EmptyStudyMaterials />
      <button onClick={handleShow} className="add-button">
        <AddIcon />
      </button>
      <SearchBar studyMaterials={studyMaterials || []} onSearchResults={setSearchResults} />
      {(categories || []).map((category) => (
        <Card className="primary">
          <Card.Header className="Card-Header">
            <div key={category}>
              <h2>{category}</h2>
            </div>
            <div className="buttons">
              <button onClick={handleShow} className="add-button">
                <AddIcon />
              </button>
              <Fab color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>
            </div>
          </Card.Header>
          <br></br>
          <Card.Body className="body">
            <br></br>
            <div className="study-materials-container">
              {(searchResults || studyMaterials || [])
                .filter((s) => s.category === category)
                .map((studyMaterial) => (
                  <StudyMaterials
                    key={studyMaterial.id}
                    studyMaterial={studyMaterial}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </Card.Body>
        </Card>
      ))}
      <Modal show={show} onHide={handleClose}>
        <UploadFileComponent handleClose={handleClose} handleAdd={handleAdd}></UploadFileComponent>
      </Modal>
    </>
  );
}

export default StudyMaterialContainer;
