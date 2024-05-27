import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials'
import { useState, useEffect, useContext } from 'react';
import "./Container.css"
import { StudyMaterialContext } from './StudyMaterialContext';
import { StudyMaterial } from '../upload-file/StudyMaterial';

function Container() {
    const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
    const studyMaterialRepository = useContext(StudyMaterialContext);

    useEffect(() => {
        const getStudyMaterials = async () => {
            setStudyMaterials(await studyMaterialRepository.find());
            console.log(studyMaterials);
        };

        if (studyMaterials === null) getStudyMaterials()

    }, [studyMaterials]);


    return (
        <>
            <Card className="primary" >
                <Card.Header>Header</Card.Header>
                <br></br>
                <Card.Body className='body'>
                    <br></br>
                    <div className="study-materials-container">
                        {/* {studyMaterials.map(docId => (
                        <StudyMaterials key={docId} docId={docId} />
                    ))} */}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}


export default Container;