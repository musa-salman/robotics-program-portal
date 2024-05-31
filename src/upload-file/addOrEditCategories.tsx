import { useContext, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import {addCategory} from './StudyRepository'
import { CategoryContext } from './CategoryContext';

import { Category } from './Category';

const AddEditCategories =(categories:Category[] | null )=>{
    const [showAddEdit, setShowAddEdit] = useState(true);
    const handleCloseAddEdit = () => setShowAddEdit(false);
    const handleShowAddEdit = () => setShowAddEdit(true);
    const [category, setCategory] = useState({category:''});
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    // const categoryRepository=useContext(CategoryContext);
    // const categoryRepository = useContext(CategoryContext)
    
  
    
    
      
    
      if (loading) {
        return <div>Loading...</div>;
      }


    const handleInputCategories = (event: any) => {
        setCategory(prevData => ({ ...prevData, category: event.target.value }));
      };
  
    const addCategories = async () => {

        // categoryRepository.create({ category}); FIXME:   
        // categories?.push(studyMaterial.category);
        // setCategories(categories);
    };

    const handleEditItem = (item:any) => {
        console.log('New value for ${item}:');
        setEditingItem(item);
      };

    const handleEditInput = (event: any,item:any) => {
    categories?.forEach((index)=>{
        console.log(index.category);
    });
    console.log(categories);
 


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
                            onChange={event => handleInputCategories(event)}
                            />
                        </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} md="3" className=' mt-2 px-3' controlId="validationCustom02">
                        <Button onClick={addCategories}>הוספה</Button>
                        </Form.Group>

                    </Row>
                    <Modal.Footer className="modal-footer-scroll">
                        {(categories || []).map((item) => (
                        <Row className="px-3" key={item.category}>
                            <Form.Group
                            as={Col}
                            controlId="validationCustom01"
                            className="position-relative "
                            >
                            <Form.Control
                                type="text"
                                name='title'
                                defaultValue={item.category}
                                required
                                disabled={editingItem !== item.category}
                                onChange={event => handleEditInput(event,item.category)}
                            />
                            </Form.Group>

                            <Form.Group as={Col} md="2" className=' mt-2' controlId="validationCustom02">
                            <Button onClick={() => handleEditItem(item)}>שינוי</Button>
                            </Form.Group>
                            <Form.Group as={Col} md="2" className=' mt-2' controlId="validationCustom02">
                            <Button variant='danger' onClick={handleEditItem}>מחיקה</Button>
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

                <Form.Group
                  as={Col}
                  md="3"
                  className=" mt-2 px-3"
                  controlId="validationCustom02">
                  <Button onClick={editItem}>שינוי</Button>
                </Form.Group>
              </Row>
            ))}
          </Modal.Footer>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            className=" px-5"
            onClick={handleCloseAddEdit}>
            סגירה
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { AddEditCategories };
