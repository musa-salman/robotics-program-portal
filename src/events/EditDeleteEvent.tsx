import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { EventProps } from './EventCard';
import { IEvent } from './repository/Event';
import { eventManagerContext } from './repository/EventManagerContext';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import moment from 'moment';
import AdminMenu from './AdminOptions';

interface EditDeleteEventProps {
  event: EventProps;
  editEvent: (event: EventProps) => void;
  deleteEvent: (id: string) => void;
}

const EditDeleteEvent: React.FC<EditDeleteEventProps> = ({ event, editEvent, deleteEvent }) => {
  const { id, title, details, date, image } = event;
  const [formData, setFormData] = useState<EventProps>(event);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [_uploadProgress, setUploadProgress] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseEdit = () => setShowModalEdit(false);
  const handleCloseDelete = () => setShowModalDelete(false);

  const eventManager = useContext(eventManagerContext);
  const eventRepository = eventManager.eventRepository;
  const storageService = useContext(StorageServiceContext);

  const MAX_CHARS_Details = 100;
  const MAX_CHARS_Title = 17;

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS_Details) {
      setFormData((prevState) => ({ ...prevState, details: value }));
    }
  };

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
    setFile(e.target.files?.[0] || null);
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
            editEvent(formData);
            eventRepository.update(id, event);
          });
        }
      );
    } else {
      editEvent(formData);
      eventRepository.update(id, event);
    }
  };

  const handleSaveDelete = async () => {
    deleteEvent(id);
    eventRepository.delete(id);
    setShowModalDelete(false);
    const filePath = '/event-img/' + id;
    // Delete the file
    storageService.delete(filePath);
  };

  function handleEdit(): void {
    setShowModalEdit(true);
  }

  function handleDelete(): void {
    setShowModalDelete(true);
  }

  function editWindow() {
    return (
      <>
        <AdminMenu handleEdit={handleEdit} handleDelete={handleDelete} />
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

  return (
    <>
      {editWindow()}
      {deleteWindow()}
    </>
  );
};

export default EditDeleteEvent;
