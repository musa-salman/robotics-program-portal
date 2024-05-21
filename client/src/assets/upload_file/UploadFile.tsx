import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import uploadFile from "./FileService"
import Modal from 'react-bootstrap/Modal';
import { SetStateAction, useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, setDoc, doc, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import download from './FileService';
import { Alert, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { string } from 'yup';

// import { storage } from '../firebase';

type SelectedItem = string[];
let items: SelectedItem[] = [];
items.push(['מיקןם הפיל']);

  


  
const UploadFileComponent: React.FC<{}> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validated, setValidated] = useState(false);
  const [selectedItem, setSelectedItems] = useState<SelectedItem >(['מיקןם הפיל']);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clickTime, setClickTime] = useState<string>('');
  // const database :any=collection(db,'files')
  const [fileData, setFileData] = useState({
    title: '',
    description: '',
    name: '',
  });
 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "categories"));
        
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data() as DocumentData;
  //         console.log("data "+data['category']);
  //         const type :any=data['category'];
  //         if (type === "הרצאות" && !items.includes(type)) {
  //           items.push(type);
  //         }
  //         // items.push(type);
  //       });
  //       // for(let i=0;i<items.length;i++){
  //       //   console.log("slect ",items);
  //       // }
  //       console.log("iteams "+items);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const addCatergories =() =>{

    return(
      <NavDropdown title="Categories" id="nav-dropdown">
        {items.map((item, index) => (
          <NavDropdown.Item eventKey={item} onClick={() => handleSelect(item)} key={index}>
            {item}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  const addItem = async(items:SelectedItem)=>{
    

  };

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedItems([eventKey]);
    }
  };

  const handleInpute =(event:any) =>{
    const { name, value } = event.target;
    setFileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleClick = () => {
    const currentTime = new Date().toLocaleString();
    setClickTime(currentTime);

    // Handle other logic here if needed
    console.log('Button clicked at:', currentTime);
  };
  

  const handleFileChange = (event:any) => {
    try{
      if (event.target.files && event.target.files[0]) {
        setFileData(prevData => ({ ...prevData, name: event.target.files[0].name }));
        setFile(event.target.files[0]);
        
      }
    }catch(error:any){
      console.error('error handling file change',error);
    }
  };


  const handleSubmit =async ()=>{
      
      // const docRef= await addDoc(collection(db,"files"),{
      //   description:fileData.description,
      //   name:fileData.name,
      //   title:fileData.title
      // })
      if(file){
        // uploadFile(file,setUploadProgress,"/study-material/"+docRef.id+"-"+fileData.name)
        // download()
      }
      // console.log("Document written with ID: ", docRef.id);
    
      console.log(fileData)
      handleClose();
      handleClick();
    
  };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          {/* <Modal.Header closeButton className=''>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
            {/* <h1>
              <Badge className='px-5 mb-0' bg="secondary">העלת קובץ</Badge>
            </h1>
          </Modal.Header> */} 

          <Form  className='bg-light border border-primary rounded shadow-lg py-4 px-5 ' style={{width:"45rem"}} 
          
          >
            {/* <h1>
              <Badge className='px-5 mb-3' bg="secondary">העלת קובץ</Badge>
            </h1> */}
            <Modal.Header closeButton className='mb-3 px-3' style={{backgroundColor: 'gray'}}>
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
                onChange={event =>handleInpute(event)}
              />
            </FloatingLabel>
              
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="position-relative my-3 " controlId='validationCustom02'>
              <Form.Control
                type="file"
                required
                
                name="file"
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
                      <NavDropdown.Item eventKey="הרצאות" onClick={() => handleSelect("הרצאות")}
                      >הרצאות</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <Button variant="link" >הוספה/שינוי</Button>
                      
                    </NavDropdown>
                  </Nav>
                  <span className='px-4'>{selectedItem}</span>
                </Navbar.Collapse>
              </Container>
            </Navbar>
                    
            <FloatingLabel className='my-3' controlId="floatingTextarea1" label="תיאור">
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Leave a comment here"
                onChange={event =>handleInpute(event)}
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
      </>
    );
  // }

};




export default UploadFileComponent;