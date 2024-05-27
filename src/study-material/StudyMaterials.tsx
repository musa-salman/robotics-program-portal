import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import  { useContext, useState } from 'react';
import { StudyMaterial } from './StudyMaterial'
import { StorageServiceContext } from '../storage-service/StorageServiceContext';

//const currentDate = moment().format('YYYY/DD/MM');

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

  return (
    <Card  className={"Card"}>
      <Card.Body>
      
      <Card.Title style = {styles}>{studyMaterial.title }</Card.Title>
        <hr className="custom-hr"/>
        <Card.Text style = {styles}>

        {studyMaterial.description || 'תאור קצר על הקובץ'}
        </Card.Text>
        {/* <div style = {styles}>{studyMaterial.date.toDateString()} </div> */}
        <br></br>
        <Button className={"button"} onClick={handleDownload} >הורד את הקובץ</Button>
        {isDownloaded && <p> </p>}
      </Card.Body>
    </Card>

    
  );
}
export default StudyMaterials;


