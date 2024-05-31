import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials';
import { useState, useEffect, useContext } from 'react';
import './StudyMaterialContainer.css';
import { StudyMaterialContext } from './StudyMaterialContext';
import { StudyMaterial } from './StudyMaterial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UploadFileComponent from '../upload-file/UploadFile'
import { Modal } from 'react-bootstrap';


function StudyMaterialContainer() {
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(
    null
  );
  const studyMaterialRepository = useContext(StudyMaterialContext);

  useEffect(() => {
    const getStudyMaterials = async () => {
      setStudyMaterials(await studyMaterialRepository.find());
    };

    const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
    const studyMaterialRepository = useContext(StudyMaterialContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = async () => { 
        UploadFileComponent
    }

  console.log(studyMaterials);

       if (studyMaterials === null)getStudyMaterials()
    }, [studyMaterials]); 

    const searchStudyMaterials = async (keyword: string) => {
        return (studyMaterials || []).filter(material =>
            material.title.toLowerCase().includes(keyword.toLowerCase()) ||
            material.description.toLowerCase().includes(keyword.toLowerCase())
        );
    };
 
    const categories = studyMaterials?.map((s) =>s.category).filter((item, index , arr)=> arr.indexOf(item) === index);
    return (
<>

{(categories || []).map(category => (

<Card className="primary" >

    <Card.Header className="Card-Header"> 
        <div key={category}>
          <h2>{category}</h2>
        </div>
        <button className="add-button" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus}  />
        </button>
     </Card.Header>
        <br></br>
        <Card.Body className='body'>
            <br></br>
            <div className="study-materials-container"> 

            {(studyMaterials || [] ).filter((s) => s.category === category).map(studyMaterial=> (
                        <StudyMaterials key={studyMaterial.id}  studyMaterial={studyMaterial} />
                    ))}
            </div>    
        </Card.Body>
      </Card>     
))}
   <Modal show={show} onHide={handleClose} >
     <UploadFileComponent></UploadFileComponent>
 </Modal>
</>
 );
}

export default StudyMaterialContainer;
