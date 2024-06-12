import { useContext, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { CategoryContext } from './CategoryContext';
import { Category } from './Category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './addorEditCategories.css';
interface YourComponentProps {
  categories: Category[] | null;
  handleCloseAddEdit: () => void;
  handleSelect: (eventKey: string | null) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>;
}

const AddEditCategories: React.FC<YourComponentProps> = ({
  categories,
  handleCloseAddEdit,
  setCategories,
  handleSelect
}) => {
  const [category, setCategory] = useState('');
  const [editcategory, setEditCategory] = useState('');
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  const categoryRepository = useContext(CategoryContext);
  const [showFirstButton, setShowFirstButton] = useState(true);

  const handleEditItem = (item: Category) => {
    if (showFirstButton) {
      setShowFirstButton(!showFirstButton);
      setShowFirstButton(false);
      setEditingItem(item);
    }
  };

  const handleInputCategories = (event: any) => {
    setCategory(event.target.value);
  };

  const checkRepeat = (input: string): boolean => {
    let x: number = 0;
    categories?.forEach((index) => {
      if (index.category !== input) {
        x += 1;
      }
    });
    return x === categories?.length;
  };

  const addCategories = async () => {
    if (checkRepeat(category)) {
      const docRef = await categoryRepository.create({ category });
      const add: Category = {
        category: category,
        id: docRef.id
      };
      handleSelect(add.category);
      setCategories((prevCategories) => {
        if (prevCategories === null) {
          return [add];
        }
        return [...prevCategories, add];
      });
    } else {
      console.log('the action dose not exist');
    }
  };

  const handleSaveItem = (item: Category) => {
    if (!checkRepeat(editcategory) && editcategory !== item.category) {
      console.log('this action dose not exist');
    } else if (item.category === editingItem?.category && editcategory !== '') {
      const edit: Category = {
        category: editcategory,
        id: editingItem.id
      };
      categoryRepository.update(editingItem.id, edit);

      setCategories((prevCategories) => {
        if (prevCategories === null) {
          return null;
        }
        return prevCategories.map((category) => (category.id === editingItem.id ? edit : category));
      });
      setShowFirstButton(true);
      setEditingItem(null);
      setEditCategory('');
    } else {
      console.log('this action dose not exist');
      setShowFirstButton(true);
      setEditingItem(null);
      setEditCategory('');
    }
  };

  const handleEditInput = (event: any) => {
    setEditCategory(event.target.value);
  };

  const handleDeleteCategory = (item: Category) => {
    categories?.forEach((index)=>{
      if(index.category === 'הכל'){
        categoryRepository.moveAllStudyMaterial(item,index);
      }
    })
    categoryRepository.delete(item.id);
    
    setCategories((prevCategories) => {
      if (prevCategories !== null) {
        return prevCategories.filter((category) => category.id !== item.id);
      }
      return null;
    });
    handleSelect('הכל');
  };

  return (
    <>
      <Modal.Header closeButton style={{ backgroundColor: '#d1c8bf' }}>
        <Modal.Title style={{ backgroundColor: '#d1c8bf', fontSize: '40px', color: 'black', border: 'none' }}>
          הוספה/שינוי
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#d1c8bf' }}>
        <Row className="mb-3" style={{ backgroundColor: '#d1c8bf' }}>
          <Form.Group as={Col} controlId="validationCustom01" className="position-relative ">
            <FloatingLabel controlId="floatingInput" label="קטגוריה">
              <Form.Control
                type="text"
                name="title"
                required
                style={{ backgroundColor: '#f5f4f3', color: 'black', border: 'none' }}
                placeholder="קטגוריה"
                onChange={(event) => handleInputCategories(event)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="3" className=" mt-2 px-3" controlId="validationCustom02">
            <Button onClick={addCategories} style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
              שמירה
            </Button>
          </Form.Group>
        </Row>
        <Modal.Footer className="modal-footer-scroll">
          {(categories || []).filter(item => item.category !== 'הכל').map((item) => (
            <Row className="px-3" key={item.category}>
              <Form.Group as={Col} controlId="validationCustom01" className="position-relative ">
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={item.category}
                  required
                  disabled={editingItem?.category !== item.category}
                  onChange={(event) => handleEditInput(event)}
                />
              </Form.Group>

              <Form.Group as={Col} md="2" className=" mt-2" controlId="validationCustom02">
                {item.category !== editingItem?.category ? (
                  <Button onClick={() => handleEditItem(item)}>
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
      <Modal.Footer className="justify-content-center" style={{ backgroundColor: '#d1c8bf' }}>
        <Button variant="secondary" className=" px-5" onClick={handleCloseAddEdit}>
          סגירה
        </Button>
      </Modal.Footer>
    </>
  );
};

export { AddEditCategories };
