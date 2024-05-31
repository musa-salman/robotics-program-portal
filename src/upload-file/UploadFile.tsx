import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { useContext, useEffect, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import './UploadFile.css';
import { CategoryContext } from './CategoryContext';
import { Category } from './Category';
import { StudyMaterialContext } from '../study-material/StudyMaterialContext';
import { StudyMaterial } from '../study-material/StudyMaterial';
import { StorageServiceContext } from '../storage-service/StorageServiceContext';
import { AddEditCategories } from './addOrEditCategories';

type SelectedItem = string;
var categoryContanir:Category []| null;
interface UploadFileComponentProps {
  handleClose: () => void;
  handleShow: () => void;
}

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({handleClose,handleShow}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItems] = useState<SelectedItem>('מיקןם הפיל');
  const [allStudyMaterial,setAllStudyMaterial] =useState<StudyMaterial[]>();
  const [categories, setCategories] = useState<Category[] |null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowAddEdit = () => setShowAddEdit(true);
  const categoryRepository = useContext(CategoryContext);
  const studyMaterialRepository = useContext(StudyMaterialContext);
  const [editingItem, setEditingItem] = useState(null);
  

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial>({
    filename: '',
    id: '',
    category: '',
    title: '',
    description: '',
    date: new Date()
  });
  const storageService = useContext(StorageServiceContext);

  const getCategory = async () => {
    try {
      const data: Category[] = await categoryRepository.find();
      setCategories(data);
      // const dataString: string[] = data.map(category => (category.category));
      // console.log("data " + dataString[0]);
      // setCategories(dataString);
      
      

    } catch (error) {
      console.error('Error fetching items:', error);
    }

  }
  const getStudyMaterial =async()=>{
    setAllStudyMaterial(await studyMaterialRepository.find());
  }

  useEffect(() => {
    if (loading && categories === null) {
      getCategory();
      getStudyMaterial();
      console.log("categories " + categories);
      setLoading(false)
 
    }
  }, [categories]);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputCategories = (event: any) => {
    setStudyMaterial((prevData) => ({
      ...prevData,
      category: event.target.value
    }));
  };

  const addCategory = async () => {

    categoryRepository.create({ category: studyMaterial.category });
    // categories?.push(studyMaterial.category);
    setCategories(categories);
  };

  const gotoChilde =()=>{
   
    AddEditCategories(categories);
  }


  const handleEditItem = (item:any) => {
    console.log('New value for ${item}:');
    setEditingItem(item);
  };

  // const handleEditInput = (event: any,item:any) => {
  //   allCategories?.forEach((index)=>{
  //     console.log(index.category);
  //   });
  //   console.log(allCategories);
  //   console.log(allStudyMaterial);


  // };

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedItems(eventKey);
      setStudyMaterial((prevData) => ({ ...prevData, category: eventKey }));
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setStudyMaterial((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDate = () => {
    const currentTime = new Date();
    setStudyMaterial((prevData) => ({ ...prevData, date: currentTime }));
  };

  const handleFileChange = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setStudyMaterial((prevData) => ({
          ...prevData,
          filename: event.target.files[0].name
        }));
        setFile(event.target.files[0]);
      }
    } catch (error: any) {
      console.error('error handling file change', error);
    }
  };

  const handleSubmit = async () => {
    const docRef = await studyMaterialRepository.create(studyMaterial);

    if (file) {
     
      storageService.upload(file, "/study-material/" + docRef.id + "-" + studyMaterial.filename, setUploadProgress);
    }
    console.log(studyMaterial)
    handleClose();
    // handleDate();

  };

  return (
    <>

      <Form className=' bg-light border border-primary rounded shadow-lg py-4 px-5 ' style={{ width: "45rem" }}>
        <Modal.Header closeButton className='bg mb-3 px-3' style={{ backgroundColor: 'gray' }}>
          <h1>העלת קובץ</h1>
        </Modal.Header>

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
              onChange={event => handleInput(event)}
            />
          </FloatingLabel>
          <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="position-relative my-3 " controlId='validationCustom02'>
          <Form.Control
            type="file"
            required
            name="filename"
            className="position-relative my-4 "
            onChange={event => handleFileChange(event)}
          />
        </Form.Group>

        <Navbar expand="lg" >
          <Container fluid>
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="בחר מיקום"
                  menuVariant="dark"
                  onSelect={handleSelect}
                  
                >   
                  <div className='modal-footer-scroll2'>
                      {(categories || []).map((item, index) => (
                        
                        <NavDropdown.Item eventKey={item.category} onClick={() => handleSelect(item.category)} key={index}>
                          {item.category}
                        </NavDropdown.Item>
                      ))}

                      <Button variant="link" onClick={() =>AddEditCategories(categories)}>הוספה/שינוי</Button>
                  
                  </div>  

                </NavDropdown>
              </Nav>
              <span className='px-4'  >{selectedItem}</span>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <FloatingLabel className='my-3' controlId="floatingTextarea1" label="תיאור">
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Leave a comment here"
            onChange={event => handleInput(event)}
            style={{ height: '100px' }}
          />
        </FloatingLabel>

        <Modal.Footer className='justify-content-center'>
          <Button variant="primary" className='mx-3 px-5' onClick={handleSubmit}>
            העלה
          </Button>
          <Button variant="secondary" className='mx-5 px-5' onClick={handleClose}>
            סגירה
          </Button>
        </Modal.Footer>
      </Form>
      

      <Modal show={showAddEdit} onHide={handleCloseAddEdit}>
          {/* <AddEditCategories categories={categories}></AddEditCategories> */}

      </Modal>

      {/* <Modal show={showAddEdit} onHide={handleCloseAddEdit}>
        <Modal.Header closeButton>
          <Modal.Title>הוספה/שינוי</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationCustom01"
              className="position-relative ">
              <FloatingLabel controlId="floatingInput" label="כותרת">
                <Form.Control
                  type="text"
                  name='title'
                  required
                  placeholder="כותרת"
                  onChange={(event) => handleInputCategories(event)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              as={Col}
              md="3"
              className=" mt-2 px-3"
              controlId="validationCustom02">
              <Button onClick={addCategories}>הוספה</Button>
            </Form.Group>
          </Row>
          <Modal.Footer className="modal-footer-scroll">
            {(categories || []).map((item) => (
              <Row className="px-3" key={item}>
                <Form.Group
                  as={Col}
                  controlId="validationCustom01"
                  className="position-relative "
                >
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={item}
                    required
                    disabled={editingItem !== item}
                    onChange={event => handleEditInput(event,item)}
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
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            className=" px-5"
            onClick={handleCloseAddEdit}>
            סגירה
          </Button>
        </Modal.Footer>
      </Modal> */}

    </>
  );

};

export default UploadFileComponent;
