import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import  { useContext, useState } from 'react';
import { StudyMaterial } from './StudyMaterial'
import { StorageServiceContext } from '../storage-service/StorageServiceContext';
import { format } from 'date-fns';
import { FaCheckCircle } from 'react-icons/fa'; 



const styles = {
    fontSize: '20px',
    color: 'black',
    fontWeight: 'bold'
  };


function StudyMaterials({ studyMaterial }: { studyMaterial: StudyMaterial }) {
  const [isDownloaded, setIsDownloaded] = useState(true);
  const storageService = useContext (StorageServiceContext);

  const handleDownload = async () => { 
    storageService.download("/study-material/"+studyMaterial.id+"-"+studyMaterial.filename);
    setIsDownloaded(true); 
  };

  const handleDelete = async () => { 
    storageService.delete("/study-material/"+studyMaterial.id+"-"+studyMaterial.filename);
  }


  const handleEdite = async () => { 
  }

  console.log(studyMaterial.date);

  return (
    <Card  className={"Card"}>
      <Card.Body>
      
      <div>
      <Card.Title style = {styles}>{studyMaterial.title }</Card.Title>
      {isDownloaded && <FaCheckCircle size="1.5em" color="black"  />}
      </div>
        <hr className="custom-hr"/>
        <Card.Text style = {styles}>
        
        {studyMaterial.description || 'תאור קצר על הקובץ'}
        </Card.Text>

        {/* <p>Date: {formattedDate}</p> */}
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


