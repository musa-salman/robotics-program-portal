import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { useContext, useEffect, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar} from 'react-bootstrap';
import "./UploadFile.css"
import { CategoryContext } from './CategoryContext';
import { Category } from './Category';
import { StudyMaterialContext } from '../study-material/StudyMaterialContext';
import { StudyMaterial } from '../study-material/StudyMaterial';
import { StorageServiceContext } from '../storage-service/StorageServiceContext';
import { AddEditCategories } from './addOrEditCategories';

type SelectedItem = string;
interface UploadFileComponentProps {
  handleClose: () => void;

}

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({handleClose}) => {
  const [file, setFile] = useState<File | null>(null);
  const [, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItems] = useState<SelectedItem>('מיקןם הפיל');
  const [allStudyMaterial,setAllStudyMaterial] =useState<StudyMaterial[]| null>(null);
  const [categories, setCategories] = useState<Category[] |null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowAddEdit = () => setShowAddEdit(true);
  const categoryRepository = useContext(CategoryContext);
  const studyMaterialRepository = useContext(StudyMaterialContext);


  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial>({
    filename: "",
    id: "",
    category: "",
    title: "",
    description: "",
    date: new Date(),
  });
  const storageService = useContext(StorageServiceContext);

  const getCategory = async () => {
    try {

      const data: Category[] = await categoryRepository.find();
      setCategories(data); 

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

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedItems(eventKey);
      setStudyMaterial(prevData => ({ ...prevData, category: eventKey }));
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setStudyMaterial(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDate = () => {
    const currentTime = new Date();
    setStudyMaterial(prevData => ({ ...prevData, date: currentTime }));
  };


  const handleFileChange = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setStudyMaterial(prevData => ({ ...prevData, filename: event.target.files[0].name }));
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
    handleDate();

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

                      <Button variant="link" onClick={handleShowAddEdit}>הוספה/שינוי</Button>
                  
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
          <AddEditCategories categories={categories} studyMaterial={allStudyMaterial} handleCloseAddEdit={handleCloseAddEdit} ></AddEditCategories>

      </Modal>

      
    </>
  );

};

export default UploadFileComponent;