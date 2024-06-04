import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials';
import { useState, useEffect, useContext } from 'react';
import './StudyMaterialContainer.css';
import { StudyMaterialContext } from './StudyMaterialContext';
import { StudyMaterial } from './StudyMaterial';
import { SearchBar } from './SearchBar';
import UploadFileComponent from '../upload-file/UploadFile';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

function StudyMaterialContainer() {
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
  const studyMaterialRepository = useContext(StudyMaterialContext);

  const [searchResults, setSearchResults] = useState<StudyMaterial[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getStudyMaterials = async () => {
      setStudyMaterials(await studyMaterialRepository.find());
    };

    if (studyMaterials === null) getStudyMaterials();
  }, [studyMaterials]);

  const handleSearchResults = (results: StudyMaterial[]) => {
    setSearchResults(results);
  };

  const handleUpdate = (updatedMaterial: StudyMaterial) => {
    const updatedMaterials = (studyMaterials || []).map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material
    );
    setStudyMaterials(updatedMaterials);
  };

  const handleDelete = (deletedItemId : string) => {
    const updatedMaterials = (studyMaterials || []).filter(material => material.id !== deletedItemId);
    setStudyMaterials(updatedMaterials);
  };

  const handleAdd = (studyMaterial: StudyMaterial) => {
   studyMaterials?.push(studyMaterial);
    setStudyMaterials(studyMaterials);
  };

  const categories = (studyMaterials || [])
    .map((s) => s.category)
    .filter((item, index, arr) => arr.indexOf(item) === index);
  
  return (
    <>
    <button onClick={handleShow} className="add-button">
            <FontAwesomeIcon icon={faPlus} />
            </button>
      <SearchBar studyMaterials={studyMaterials || []} onSearchResults={handleSearchResults} />
      {(categories || []).map((category) => (
        <Card className="primary">
          <Card.Header className="Card-Header">
            <div key={category}>
              <h2>{category}</h2>
            </div>
            <button onClick={handleShow} className="add-button">
            <FontAwesomeIcon icon={faPlus} />
            </button>
          </Card.Header>
          <br></br>
          <Card.Body className="body">
            <br></br>
            <div className="study-materials-container">
              {(searchResults.length > 0 ? searchResults : studyMaterials || [])
                .filter((s) => s.category === category)
                .map((studyMaterial) => (
                  <StudyMaterials key={studyMaterial.id} studyMaterial={studyMaterial} onUpdate={handleUpdate} onDelete={handleDelete} />
                ))}
            </div>
          </Card.Body>
        </Card>
      ))}
      <Modal show={show} onHide={handleClose}>
        <UploadFileComponent handleClose={handleClose} handleAdd ={handleAdd}></UploadFileComponent>
      </Modal>
    </>
  );
}

export default StudyMaterialContainer;
