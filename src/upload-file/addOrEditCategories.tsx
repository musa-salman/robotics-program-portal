import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import {addCategory} from './StudyMaterialRepository'


const addEditCategories =(categories:string[])=>{
    const [showAddEdit, setShowAddEdit] = useState(true);
    const handleCloseAddEdit = () => setShowAddEdit(false);
    const handleShowAddEdit = () => setShowAddEdit(true);
    const [category, setCategory] = useState({category:''});


    const handleInputeCatrgores=(event:any) => {
        const { name, value } = event.target;
        setCategory(prevData => ({ ...prevData, [name]: value }));
    
    };

    const addCategories = async ()=>{
    // try {
    //     const docRef = await addDoc(collection(db, "categories"), {
    //     name: category.category
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
    // console.log("event: g "+category.category);
        addCategory('categories');
    };

    const editItem=  ()=>{

    };
    
    const handleEditInpute=(event:any) => {
  
  
  
    };
  
    return(
        <>
           <Modal show={showAddEdit} onHide={handleCloseAddEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספה/שינוי</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            controlId="validationCustom01"
                            className="position-relative "            
                        >
                            <FloatingLabel
                            controlId="floatingInput"
                            label="כותרת"
                            >
                            <Form.Control
                            type="text"
                            name='title'
                            
                            required
                            placeholder="כותרת"
                            onChange={event =>handleInputeCatrgores(event)}
                            />
                            </FloatingLabel>
                        </Form.Group>    

                        <Form.Group as={Col} md="3" className=' mt-2 px-3' controlId="validationCustom02">
                        <Button  onClick={addCategories}>הוספה</Button> 
                        </Form.Group>
                        
                        </Row>                  
                    <Modal.Footer>
                        {categories.map((item) => (
                            <Row className="mx-3">
                                <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                                className="position-relative "    
                                        
                                >
                                <Form.Control
                                    type="text"
                                    name='title'
                                    defaultValue={item}
                                    required
                                    
                                    onChange={event =>handleEditInpute(event)}
                                />
                                
                                </Form.Group>    

                                <Form.Group as={Col} md="3" className=' mt-2 px-3' controlId="validationCustom02">
                                <Button  onClick={editItem}>שינוי</Button> 
                                </Form.Group>
                            </Row>
                        ))}
                    
                    </Modal.Footer>           
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="secondary" className=' px-5' onClick={handleCloseAddEdit}>
                        סגירה
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );

};

export {addEditCategories };