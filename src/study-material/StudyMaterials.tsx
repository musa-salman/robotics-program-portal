import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import  { useContext } from 'react';
import { StudyMaterial } from './StudyMaterial'
import { StorageServiceContext } from '../storage-service/StorageServiceContext';
import moment from 'moment';

const styles = {
    fontSize: '20px',
    color: 'black',
    fontWeight: 'bold'
  };


function StudyMaterials({ studyMaterial }: { studyMaterial: StudyMaterial }) {
  const storageService = useContext (StorageServiceContext);

  const handleDownload = async () => { 
    storageService.download("/study-material/"+studyMaterial.id+"-"+studyMaterial.filename);
    
  };

  const handleDelete = async () => { 
    storageService.delete("/study-material/"+studyMaterial.id+"-"+studyMaterial.filename);
  }


  const handleEdite = async () => { 
  }

  console.log(studyMaterial.date);

  const momentDate = moment(studyMaterial.date.toDate());
  console.log(studyMaterial.date);

// Format the moment object
const formattedDate = moment(momentDate).format('MMMM DD, YYYY');
console.log(formattedDate);

  return (
    <Card  className={"Card"}>
      <Card.Body>
      
      <div>
      <Card.Title style = {styles}>{studyMaterial.title }</Card.Title>
      
      </div>
        <hr className="custom-hr"/>
        <Card.Text style = {styles}>
        
        {studyMaterial.description || 'תאור קצר על הקובץ'}
        </Card.Text>

        <p>Date: {formattedDate}</p> 
        <br></br>
        <Button className="button"onClick={handleDownload} >הורד את הקובץ</Button>
        <br></br>
        <br></br>
        <Button className="button" onClick={handleDelete} >למחוק את הקובץ</Button>
        <br></br>
        <br></br>
        <Button className="button" onClick={handleEdite} >Edit את הקובץ</Button>
       
      </Card.Body>
    </Card>

    
  );
}
export default StudyMaterials;


