import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials'
// import { SearchBar } from './SearchBar'
import { db } from '../firebase';
import  { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import "./Container.css"

function Container() {  

    const [documentIds, setDocumentIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchIds = async () => {
             const querySnapshot = await getDocs(collection(db, "files"));
                const ids = querySnapshot.docs.map(doc => doc.id);
                setDocumentIds(ids);
        };

        fetchIds();
    }, []); 

    return (
<>
<Card className="primary" >
        <Card.Header>Header</Card.Header>
        <br></br>
        <Card.Body className='body'>
            <br></br>
            <div className="study-materials-container">    
            {documentIds.map(docId => (
                        <StudyMaterials key={docId} docId={docId} />
                    ))}
            </div>    
        </Card.Body>
      </Card>
</>
 );
}


export default Container;