import { useContext, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { CategoryContext } from './CategoryContext';
import { Category } from './Category';
import { StudyMaterial } from '../study-material/StudyMaterial';
import { StudyMaterialContext } from '../study-material/StudyMaterialContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFloppyDisk, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface YourComponentProps {
  categories: Category[] | null;
  studyMaterial: StudyMaterial[] | null;
  handleCloseAddEdit: () => void; 
  setCategories:React.Dispatch<React.SetStateAction<Category[] | null>>;
}

const AddEditCategories: React.FC<YourComponentProps> = ({ categories, studyMaterial, handleCloseAddEdit ,setCategories}) => {
  const [category, setCategory] = useState("");
  const [editcategory, setEditCategory] = useState("");  
  const [editingItem, setEditingItem] = useState("");
  const studyMaterialRepository = useContext(StudyMaterialContext);
  const categoryRepository = useContext(CategoryContext);
  const [showFirstButton, setShowFirstButton] = useState(true);

  const handleEditItem = (item: string) => {
    setShowFirstButton(!showFirstButton);
    setEditingItem(item);
  };

  const handleInputCategories = (event: any) => {
    setCategory(event.target.value );
  };

  const addCategories = async () => {
    const docRef=await categoryRepository.create({ category}); //FIXME:id dose not exist
    const add:Category={
      category:category,
      id:docRef.id
    };
    setCategories(prevCategories => {
      if (prevCategories === null) {
        return [add];
      }
      return [...prevCategories, add];
    });
  };

  const handleSaveItem = (item: Category) => {
    const edit: Category = {
      category: editcategory,
      id: item.id
    };
    categoryRepository.update(item.id,edit);

    studyMaterial?.forEach((index) => {
      if (index.category === item.category) {
        const study: StudyMaterial = {
          category: editcategory,
          date: index.date,
          description: index.description,
          filename: index.filename,
          id: index.id,
          title: index.title
        };
        studyMaterialRepository.update(index.id, study);
      }
    });
    setCategories(prevCategories => {
      if (prevCategories === null) {
        return null;
      }
      return prevCategories.map(category =>
        category.id === item.id ?  edit: category
      );
    });
    setShowFirstButton(!showFirstButton);
    setEditingItem("");
  };

  const handleEditInput = (event: any) => {
    setEditCategory(event.target.value);
    console.log(editcategory);
  };

  const handleDeleteCategory = (item: Category) => {
 
    setCategories(prevCategories => {
      if (prevCategories !== null) {
        return prevCategories.filter(category => category.id !== item.id);
      }
      return null;
    });

    categoryRepository.delete(item.id);
    studyMaterial?.forEach((index) => {
      if (index.category === item.category) {
        const study: StudyMaterial = {
          category: '',
          date: index.date,
          description: index.description,
          filename: index.filename,
          id: index.id,
          title: index.title
        };
        studyMaterialRepository.update(index.id, study);
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>הוספה/שינוי</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom01" className="position-relative ">
            <FloatingLabel controlId="floatingInput" label="כתיכורי">
              <Form.Control
                type="text"
                name="title"
                required
                placeholder="כתיכורי"
                onChange={(event) => handleInputCategories(event)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="3" className=" mt-2 px-3" controlId="validationCustom02">
            <Button onClick={addCategories}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </Button>
          </Form.Group>
        </Row>
        <Modal.Footer className="modal-footer-scroll">
          {(categories || []).map((item) => (
            <Row className="px-3" key={item.category}>
              <Form.Group as={Col} controlId="validationCustom01" className="position-relative ">
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={item.category}
                  required
                  disabled={editingItem !== item.category}
                  onChange={(event) => handleEditInput(event)}
                />
              </Form.Group>

              <Form.Group as={Col} md="2" className=" mt-2" controlId="validationCustom02">
                {showFirstButton ? (
                  <Button onClick={() => handleEditItem(item.category)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                ) : (
                  <Button onClick={() => handleSaveItem(item)}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </Button>
                )}
                
              </Form.Group>
              <Form.Group as={Col} md="2" className=" mt-2" controlId="validationCustom02">
                <Button variant="danger" onClick={() => handleDeleteCategory(item)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Form.Group>
            </Row>
          ))}
        </Modal.Footer>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" className=" px-5" onClick={handleCloseAddEdit}>
          סגירה
        </Button>
      </Modal.Footer>
    </>
  );
};

export { AddEditCategories };
