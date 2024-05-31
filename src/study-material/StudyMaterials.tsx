import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import { useContext } from 'react';
import { StudyMaterial } from './StudyMaterial';
import { StorageServiceContext } from '../storage-service/StorageServiceContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileArrowDown}  from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
        
import moment from 'moment';

const styles = {
    fontSize: '20px',
    color: 'black',
    fontWeight: 'bold',
    padding: '5px'
  };


function StudyMaterials({ studyMaterial }: { studyMaterial: StudyMaterial }) {
  const storageService = useContext(StorageServiceContext);

  const handleDownload = async () => {
    storageService.download(
      '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename
    );
  };

<<<<<<< HEAD
  const handleDelete = async () => { 
    storageService.delete("/study-material/"+studyMaterial.id+"-"+studyMaterial.filename);
    
  }
=======
  const handleDelete = async () => {
    storageService.delete(
      '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename
    );
  };
>>>>>>> a9d7d60e807ebe1beb324348c932fc69a8b8c73d

  const handleEdite = async () => {};


  const momentDate = moment(studyMaterial.date.toDate());
  const formattedDate = moment(momentDate).format('DD / MM / YYYY');

<<<<<<< HEAD
=======
  // Format the moment object
  const formattedDate = moment(momentDate).format('MMMM DD, YYYY');
  console.log(formattedDate);
>>>>>>> a9d7d60e807ebe1beb324348c932fc69a8b8c73d

  return (
    <Card className={'Card'}>
      <Card.Body>
<<<<<<< HEAD
      
      <div>
      <Card.Title style = {styles}>{studyMaterial.title }</Card.Title>
      
      </div>
        <hr className="custom-hr"/>
        <Card.Text style = {styles}>
        {studyMaterial.description || 'תאור קצר על הקובץ'}
        </Card.Text>
        <p style = {styles} > תאריך : {formattedDate} </p> 
        <br/>
        <div className = "btns">
        <Button className="button"onClick={handleDownload} >
        <FontAwesomeIcon icon={faFileArrowDown} className="plus-icon" /></Button>
        <Button className="button" onClick={handleDelete} >
        <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button className="button" onClick={handleEdite} >
        <FontAwesomeIcon icon={faPenToSquare} /></Button>
        </div>
      </Card.Body>
    </Card> 
=======
        <div>
          <Card.Title style={styles}>{studyMaterial.title}</Card.Title>
        </div>
        <hr className="custom-hr" />
        <Card.Text style={styles}>
          {studyMaterial.description || 'תאור קצר על הקובץ'}
        </Card.Text>

        <p>Date: {formattedDate}</p>
        <br></br>
        <Button className="button" onClick={handleDownload}>
          הורד את הקובץ
        </Button>
        <br></br>
        <br></br>
        <Button className="button" onClick={handleDelete}>
          למחוק את הקובץ
        </Button>
        <br></br>
        <br></br>
        <Button className="button" onClick={handleEdite}>
          Edit את הקובץ
        </Button>
      </Card.Body>
    </Card>
>>>>>>> a9d7d60e807ebe1beb324348c932fc69a8b8c73d
  );
}
export default StudyMaterials;
