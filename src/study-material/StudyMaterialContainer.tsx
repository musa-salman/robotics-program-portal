import Card from 'react-bootstrap/Card';
import StudyMaterials from './StudyMaterials'
import { useState, useEffect, useContext } from 'react';
import "./StudyMaterialContainer.css"
import { StudyMaterialContext } from './StudyMaterialContext';
import { StudyMaterial } from './StudyMaterial';


function StudyMaterialContainer() {

    const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
    const studyMaterialRepository = useContext(StudyMaterialContext);

    useEffect(() => {
        const getStudyMaterials = async () => {
            setStudyMaterials(await studyMaterialRepository.find());
        };

        if (studyMaterials === null) getStudyMaterials();
    }, [studyMaterials]);


    console.log(studyMaterials);

    const categories = studyMaterials?.map((s) => s.category).filter((item, index, arr) => arr.indexOf(item) === index);
    return (
        <>

            {(categories || []).map(category => (

                <Card className="primary" >

                    <Card.Header className="Card-Header">
                        <div key={category}>
                            <h2>{category}</h2>
                        </div>
                        <button className="add-button"></button>
                    </Card.Header>
                    <br></br>
                    <Card.Body className='body'>
                        <br></br>
                        <div className="study-materials-container">

                            {(studyMaterials || []).filter((s) => s.category === category).map(studyMaterial => (
                                <StudyMaterials key={studyMaterial.id} studyMaterial={studyMaterial} />
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}


export default StudyMaterialContainer;