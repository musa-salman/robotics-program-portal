import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Badge from 'react-bootstrap/Badge';
import uploadFile from "./FileService"
import Modal from 'react-bootstrap/Modal';
import { SetStateAction, useContext, useEffect, useState } from 'react';

import { Container, InputGroup, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import "./UploadFile.css"
import { CategoryContext } from './CategoryContext';
import {addCategory ,getCategories} from './StudyRepository'
import { Category } from './Category';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { StudyMaterialContext } from '../study-material/StudyMaterialContext';
import { StudyMaterial } from '../study-material/StudyMaterial';
import { StorageServiceContext } from '../storage-service/StorageServiceContext';
let categories: SelectedItem[] = [];
// import { storage } from '../firebase';

type SelectedItem = string;

  
const UploadFileComponent: React.FC<{}> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validated, setValidated] = useState(false);
  const [selectedItem, setSelectedItems] = useState<SelectedItem >('מיקןם הפיל');//FIXME:
  const [categories,setCategories] =useState<string []| null> (null);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowAddEdit = () => setShowAddEdit(true);
  const categoryRepository=useContext(CategoryContext);
  const studyMaterialRepository=useContext(StudyMaterialContext);
  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial >({
    filename: "",
    // filePath: "",
    category: "",
    title: "",
    description: "",
    date: new Date(),
  });
  const storageService=useContext(StorageServiceContext);
  

 
  const getCategory=async () =>{
    try{

      const data :Category[] =await categoryRepository.find();
      if(data !== undefined){
        const dataString:string[]=data.map(category => JSON.stringify(category.category));
        console.log("data "+dataString[0]);
        setCategories(dataString);//FIXME:
      }

    }catch(error){
      console.error('Error fetching items:', error);
    }
     
  }


  useEffect(() => {
    
    if (loading && categories === null){ 
      getCategory();
      console.log("categories "+categories);
      setLoading(false)

    }
  }, [categories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputCategories=(event:any) => {
    setStudyMaterial(prevData => ({ ...prevData, category: event.target.value }));
  };

  const addCategories = async ()=>{

    categoryRepository?.create({category:studyMaterial.category});
    categories?.push(studyMaterial.category);
    setCategories(categories);
  };

  const editItem=  ()=>{

  };

  const handleEditInpute=(event:any) => {



  };
  
  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedItems(eventKey);
      setStudyMaterial(prevData => ({ ...prevData, category: eventKey }));
    }
  };

  const handleInput =(event:any) =>{
    const { name, value } = event.target;
    setStudyMaterial(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDate = () => {
    const currentTime = new Date();
    setStudyMaterial(prevData => ({ ...prevData, date: currentTime }));
  };
  

  const handleFileChange = (event:any) => {
    try{
      if (event.target.files && event.target.files[0]) {
        setStudyMaterial(prevData => ({ ...prevData, filename: event.target.files[0].name }));
        setFile(event.target.files[0]);
        
      }
    }catch(error:any){
      console.error('error handling file change',error);
    }
  };


  const handleSubmit =async ()=>{
    
      const docRef=await studyMaterialRepository.create(studyMaterial);
      
      if(file){
        storageService.upload(file,"/study-material/"+docRef.id+"-"+studyMaterial.filename,setUploadProgress);
        // uploadFile(file,setUploadProgress,"/study-material/"+docRef.id+"-"+studyMaterial.filename)
        // download()
      }
      // console.log("Document written with ID: ", docRef.id);
    
      console.log(studyMaterial)
      handleClose();
      handleDate();
    
  };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose} >
          {/* <Modal.Header closeButton className=''>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
            {/* <h1>
              <Badge className='px-5 mb-0' bg="secondary">העלת קובץ</Badge>
            </h1>
          </Modal.Header> */} 

          <Form  className=' bg-light border border-primary rounded shadow-lg py-4 px-5 ' style={{width:"45rem"}} 
          
          >
            {/* <h1>
              <Badge className='px-5 mb-3' bg="secondary">העלת קובץ</Badge>
            </h1> */}
            <Modal.Header closeButton className='bg mb-3 px-3' style={{backgroundColor: 'gray'}}>
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
                onChange={event =>handleInput(event)}
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
                onChange={event =>handleFileChange(event)}
                
              />
            </Form.Group>


            <Navbar  expand="lg" >
              <Container fluid>
                <Navbar.Collapse id="navbar-dark-example">
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="בחר מיקום"
                      menuVariant="dark"
                      onSelect={handleSelect}
                    >
                      {/* <NavDropdown.Item eventKey="הרצאות" onClick={() => handleSelect("הרצאות")}
                      >הרצאות</NavDropdown.Item>
                      <NavDropdown.Divider /> */}
                      
                      {(categories || []).map((item, index) => (
                        <NavDropdown.Item eventKey={item} onClick={() => handleSelect(item)} key={index}>
                          {item}
                        </NavDropdown.Item>
                      ))}
                     
                      <Button variant="link" onClick={handleShowAddEdit}>הוספה/שינוי</Button>
                      
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
                onChange={event =>handleInput(event)}
                style={{ height: '100px' }}
              />
            </FloatingLabel>
    
            {/* <Button className='justify-content-center align-items-center px-5 my-3' onClick={handleSubmit}  >העלה</Button> */}
    
            <Modal.Footer className='justify-content-center'>
             
              <Button variant="primary" className='mx-3 px-5' onClick={handleSubmit}>
                העלה
              </Button>
              <Button variant="secondary" className='mx-5 px-5' onClick={handleClose}>
                סגירה
              </Button>
            </Modal.Footer>
          </Form> 
        </Modal>

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
                  onChange={event =>handleInputCategories(event)}
                  />
                  </FloatingLabel>
              </Form.Group>    

              <Form.Group as={Col} md="3" className=' mt-2 px-3' controlId="validationCustom02">
              <Button  onClick={addCategories}>הוספה</Button> 
              </Form.Group>
              
            </Row>                  
            <Modal.Footer>
              {(categories || []).map((item) => (
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
  // }

  };




export default UploadFileComponent;