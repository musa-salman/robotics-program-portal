import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useContext, useEffect, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import './UploadFile.css';
import { Category } from './Category';
import { MaterialContext } from '../study-material/repository/StudyMaterialContext';
import { StudyMaterial } from '../study-material/StudyMaterial';
import { CategoryManagement } from './CategoryManagement';
import { StorageServiceContext } from '../storage-service/StorageContext';
import GPT from '../gpt-service/GPTComponent';
import { generateMaterialDescription, suggestMaterialTitles } from './StudyMaterialPrompts';

type SelectedItem = string;
interface UploadFileComponentProps {
  handleClose: () => void;
  handleAdd: (studyMaterial: StudyMaterial) => void;
}

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({ handleClose, handleAdd }) => {
  const [file, setFile] = useState<File | null>(null);
  const [, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItems] = useState<SelectedItem>('הכל');
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const handleCloseAddEdit = () => setShowAddEdit(false);
  const handleShowAddEdit = () => setShowAddEdit(true);
  const studyMaterialManagement = useContext(MaterialContext);
  const [validated, setValidated] = useState(false);

  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial>({
    filename: '',
    id: '',
    category: '',
    title: '',
    description: '',
    date: new Date()
  });
  const storageService = useContext(StorageServiceContext);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data: Category[] = await studyMaterialManagement.categoryRepository.find();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (loading && categories === null) {
      getCategory();
      setLoading(false);
    }
  }, [categories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedItems(eventKey);
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
        setStudyMaterial((prevData) => ({ ...prevData, filename: event.target.files[0].name }));
        setFile(event.target.files[0]);
      }
    } catch (error: any) {
      console.error('error handling file change', error);
    }
  };

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (file !== null && studyMaterial.title !== '') {
      // const docRef = await studyMaterialRepository.create(studyMaterial);
      studyMaterial.category = selectedItem;
      studyMaterialManagement.studyMaterialRepository.create(studyMaterial).then((docRef) => {
        storageService.upload(
          file,
          '/study-material/' + docRef.id + '-' + studyMaterial.filename,
          setUploadProgress,
          () => {},
          () => {}
        );
      });

      handleAdd(studyMaterial);
      handleClose();
      handleDate();
    }
  };

  return (
    <>
      <Modal.Header closeButton style={{ backgroundColor: '#d1c8bf', width: '45rem' }}>
        <h1 style={{ fontSize: '40px', color: 'black', border: 'none' }}>העלת קובץ</h1>
      </Modal.Header>
      <Modal.Body className="backgroundStyle">
        <Form className="px-3 mx-3" noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="px-1">
            <Form.Label>כותרת</Form.Label>
            <GPT
              initialValue=""
              getData={() => suggestMaterialTitles(studyMaterial)}
              options={{ simplify: false, improve: false, shorten: false }}>
              <Form.Control
                type="text"
                name="title"
                required
                style={{ backgroundColor: '#f5f4f3', color: 'black', border: 'none' }}
                placeholder="כותרת"
                onChange={(event) => handleInput(event)}
              />
            </GPT>
          </Form.Group>

          <Form.Group className="position-relative my-3 px-2" controlId="validationCustom02">
            <Form.Control
              type="file"
              required
              name="filename"
              className="position-relative my-4 "
              onChange={(event) => handleFileChange(event)}
            />
          </Form.Group>

          <Navbar expand="lg">
            <Container fluid>
              <Navbar.Collapse id="navbar-dark-example">
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="בחר מיקום"
                    menuVariant="dark"
                    onSelect={handleSelect}>
                    <div className="modal-footer-scroll2">
                      {(categories || [])
                        .filter((item) => item.category !== 'הכל')
                        .map((item, index) => (
                          <NavDropdown.Item
                            eventKey={item.category}
                            onClick={() => handleSelect(item.category)}
                            key={index}>
                            {item.category}
                          </NavDropdown.Item>
                        ))}

                      <Button variant="link" onClick={handleShowAddEdit}>
                        הוספה/שינוי
                      </Button>
                    </div>
                  </NavDropdown>
                </Nav>
                <span className="px-4">{selectedItem}</span>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Form.Label>תיאור</Form.Label>
          <GPT initialValue="" getData={() => generateMaterialDescription(studyMaterial)}>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="הכנס תיאור"
              onChange={(event) => handleInput(event)}
              style={{ height: '100px', backgroundColor: '#f5f4f3', color: 'black', border: 'none' }}
            />
          </GPT>

          <Modal.Footer className="justify-content-center">
            <Button variant="primary" className="mx-3 px-5" onClick={handleSubmit}>
              העלה
            </Button>
            <Button variant="secondary" className="mx-5 px-5" onClick={handleClose}>
              סגירה
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>

      <Modal show={showAddEdit} onHide={handleCloseAddEdit}>
        <CategoryManagement
          categories={categories}
          handleCloseAddEdit={handleCloseAddEdit}
          setCategories={setCategories}
          handleSelect={handleSelect}></CategoryManagement>
      </Modal>
    </>
  );
};

export default UploadFileComponent;
