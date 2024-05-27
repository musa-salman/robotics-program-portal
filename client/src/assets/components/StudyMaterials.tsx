import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import './StudyMaterials.css';
import { db } from './firebaseInit';
import { doc, getDoc ,DocumentData} from 'firebase/firestore';
import  { useState, useEffect  } from 'react';

const currentDate = moment().format('YYYY/DD/MM');

const styles = {
    fontSize: '20px',
    color: 'black',
    fontWeight: 'bold'
  };


function StudyMaterials({ docId }: { docId: string }) {
  const [fileData, setFileData] = useState<DocumentData | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(true);
  
  
  const handleClick = async () => {  
    console.log('Downloading...');
    setIsDownloaded(true); 
  };

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, "files", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFileData(docSnap.data());
      } else {
        console.log("No such document!");
        setFileData(null);  
      }
    };

    fetchDocument();
  }, [docId]);  // Dependency array includes docId to refetch if it changes

  if (!fileData) {
    return <div>Loading...</div>;  // Or any other placeholder content
  }

  return (
    <Card  className={"Card"}>
      <Card.Body>
      
      <Card.Title style = {styles}>{fileData.title || 'שם הקובץ'}</Card.Title>
        <hr className="custom-hr"/>
        <Card.Text style = {styles}>

        {fileData.description || 'תאור קצר על הקובץ'}
        </Card.Text>
        <div style = {styles}>תאריך: {currentDate}</div>
        <br></br>
        <Button className={"button"} onClick={handleClick} >הורד את הקובץ</Button>
        {isDownloaded && <p> </p>}
      </Card.Body>
    </Card>

    
  );
}
export default StudyMaterials;


