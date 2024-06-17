import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from './EventContext';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { IEvent } from './Event';
import './EventCard.css';
import moment from 'moment';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { StorageServiceContext } from '../storage-service/StorageContext';
import AdminMenu from './AdminOptions';
import { CircularProgress, Box, IconButton } from '@mui/material';
import { StudentEventContext } from './StudentEventContext';
import { StudentEventProps } from './StudentEventProps';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface EventProps {
  date: Date;
  title: string;
  details: string;
  image: string;
  onEventDelete: (id: string) => void;
  onEventEdit: (event: EventProps) => void;
  id: string;
}

const EventCard: React.FC<EventProps> = ({ date, title, details, image, onEventDelete, onEventEdit, id }) => {
  const [formData, setFormData] = useState<EventProps>({
    date,
    title,
    details,
    image,
    onEventDelete,
    onEventEdit,
    id
  });

  const MAX_CHARS_Details = 100; // Set the maximum number of characters allowed

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS_Details) {
      setFormData((prevState) => ({ ...prevState, details: value }));
    }
  };

  const MAX_CHARS_Title = 17; // Set the maximum number of characters allowed

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS_Title) {
      setFormData((prevState) => ({ ...prevState, title: value }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, date: e.target.valueAsDate! }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, image: e.target.value }));
    setFile(e.target.files?.[0] || null); // Provide a default value of null for the file state variable
  };

  const [isLoading, setIsLoading] = useState(true);

  const [registerd, setRegister] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const handleCloseRegister = () => setShowModalRegister(false);
  const handleShowRegister = () => setShowModalRegister(true);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleCloseEdit = () => setShowModalEdit(false);
  const handleShowEdit = () => setShowModalEdit(true);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = () => setShowModalDelete(true);

  const [file, setFile] = useState<File | null>(null);
  const [_uploadProgress, setUploadProgress] = useState(0);

  const [showDetails, setShowDetails] = useState(false);

  const eventRepository = useContext(EventContext);
  const storageService = useContext(StorageServiceContext);

  function handleDelete() {
    handleShowDelete();
  }

  function handleEdit() {
    handleShowEdit();
  }

  function handleRegister() {
    handleShowRegister();
  }

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSaveEdit = async () => {
    const event: IEvent = {
      date: formData.date,
      title: formData.title,
      details: formData.details,
      imageURL: formData.image,
      id: formData.id
    };

    setShowModalEdit(false);
    if (file) {
      await storageService.upload(
        file,
        '/event-img/' + id,
        setUploadProgress,
        () => {},
        () => {
          const storage = getStorage();
          const filePath = '/event-img/' + id;
          getDownloadURL(ref(storage, filePath)).then((url) => {
            event.imageURL = url;
            formData.image = url;
            onEventEdit(formData);
            eventRepository.update(id, event);
          });
        }
      );
    } else {
      onEventEdit(formData);
      eventRepository.update(id, event);
    }
  };

  const handleSaveDelete = async () => {
    onEventDelete(id);
    setShowModalDelete(false);
    // Delete associated records from Firestore
    registeredStudents?.forEach(async (studentEvent) => {
      await StudentEventRepository.delete(studentEvent.id);
    });
    setRegisteredStudents((registeredStudents || []).filter((e) => e.EventId !== id));
    await eventRepository.delete(id);
    // Create a reference to the file to delete
    const filePath = '/event-img/' + id;
    // Delete the file
    storageService.delete(filePath);
  };

  const [registeredStudents, setRegisteredStudents] = useState<StudentEventProps[] | null>(null);
  const StudentEventRepository = useContext(StudentEventContext);

  // //FIXME: get user id
  const StudentEvent: StudentEventProps = {
    StudentId: 'getUserID', // get user id
    EventId: formData.id,
    id: ''
  };

  const checkIfRegistered = () => {
    if (registeredStudents?.some((user) => user.StudentId === StudentEvent.StudentId)) {
      setRegister(true);
    }
  };

  useEffect(() => {
    const getRegisteredStudents = async () => {
      setRegisteredStudents((await StudentEventRepository.find()).filter((student) => student.EventId === id));
    };

    if (registeredStudents === null) getRegisteredStudents();
    if (registeredStudents !== null) checkIfRegistered();
  }, [registeredStudents]);

  const handleSaveRegister = async () => {
    setShowModalRegister(false);
    if (
      registeredStudents &&
      !registeredStudents.some((user) => user.StudentId === StudentEvent.StudentId) &&
      id !== ''
    ) {
      StudentEvent.EventId = formData.id;
      const docRef = await StudentEventRepository.create(StudentEvent);
      StudentEvent.id = docRef.id;
      registeredStudents?.push(StudentEvent);
      setRegister(true);
    }
  };

  const handleRemoveRegistration = (studentId: string) => {
    // Add your code to remove the student registration here
    const docId = registeredStudents?.find((student) => student.StudentId === studentId)?.id;
    if (docId) {
      StudentEventRepository.delete(docId);
      setRegisteredStudents((registeredStudents || []).filter((student) => student.StudentId !== studentId));
    } else {
      alert('Error: Student not found in the registered students list. Please try again.');
    }
  };

  const handleShowDetails = () => {
    return (
      <div>
        <Modal show={showDetails} onHide={handleDetails} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>רשומים לאירוע</Modal.Title>
          </Modal.Header>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>סך הסטודנטים הרשומים : {registeredStudents?.length}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registeredStudents?.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.StudentId}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveRegistration(student.StudentId)}
                        aria-label="delete"
                        size="small">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal>
      </div>
    );
  };

  function editWindow() {
    return (
      <>
        <Modal show={showModalEdit} onHide={handleCloseEdit} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>שינוי אירוע</Modal.Title>
          </Modal.Header>
          <Modal.Body>{editForm()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              סגור
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              שמור שינויים
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function editForm() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>כותרת</Form.Label>
          <Form.Control
            type="text"
            defaultValue={title}
            onChange={handleTitleChange}
            maxLength={MAX_CHARS_Title} // Set the maximum length of the textarea
          />
          <small>
            {formData.title.length}/{MAX_CHARS_Title} אותיות
          </small>{' '}
          {/* Display the character count */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>תאריך</Form.Label>
          <Form.Control type="date" defaultValue={moment(date).format('YYYY-MM-DD')} onChange={handleDateChange} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>העלאת תמונה</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>פרטים</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={details}
            onChange={handleDetailsChange}
            maxLength={MAX_CHARS_Details} // Set the maximum length of the textarea
          />
          <small>
            {formData.details.length}/{MAX_CHARS_Details} אותיות
          </small>{' '}
          {/* Display the character count */}
        </Form.Group>
      </Form>
    );
  }

  function deleteWindow() {
    return (
      <>
        <Modal show={showModalDelete} onHide={handleCloseDelete} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>האם אתה בטוח שברצונך למחוק את האירוע הזה</Modal.Title>
          </Modal.Header>
          <Modal.Body>אתה לא יכול לחזור אחורה לאחר מחיקת האירוע</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              סגור
            </Button>
            <Button variant="danger" onClick={handleSaveDelete}>
              לִמְחוֹק
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function registerWindow() {
    const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSaveRegister();
    };

    return (
      <>
        <Modal show={showModalRegister} onHide={handleCloseRegister} style={{ display: 'center' }}>
          <Form onSubmit={handleSubmitRegister}>
            <Modal.Header closeButton>
              <Modal.Title>האם אתה בטוח שאתה רוצה להירשם לאירוע</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Form.Check required aria-label="option 1" feedback="You must agree before submitting." />
                אני מאשר שאני רוצה להירשם לאירוע
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRegister}>
                  סגור
                </Button>
                <Button variant="primary" type="submit">
                  מאשר
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        </Modal>
      </>
    );
  }

  return (
    <Card className="event-card">
      {isLoading && (
        <Box className="loading-image">
          <CircularProgress />
        </Box>
      )}
      <Card.Img
        variant="top"
        src={image}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <Card.Body style={{ marginTop: '150px' }}>
        <AdminMenu handleEdit={handleEdit} handleDelete={handleDelete} handleDetails={handleDetails} />
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <p>
            <strong>תאריך:</strong> {moment(date).format('YYYY-MM-DD')}
          </p>
          <p>
            <strong>פרטים:</strong> {details}
          </p>
        </Card.Text>
        {registerd ? (
          <Button variant="secondary" disabled>
            רשום
          </Button>
        ) : (
          <Button variant="primary" onClick={handleRegister}>
            הירשם
          </Button>
        )}
      </Card.Body>
      {editWindow()}
      {deleteWindow()}
      {registerWindow()}
      {handleShowDetails()}
    </Card>
  );
};

export default EventCard;
