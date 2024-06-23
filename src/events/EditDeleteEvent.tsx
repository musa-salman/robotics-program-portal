import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { EventProps } from './EventCard';
import { IEvent } from './repository/Event';
import { eventServiceContext } from './repository/EventContext';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import AdminMenu from './AdminOptions';
import CustomForm from './CustomForm';

interface EditDeleteEventProps {
  event: EventProps;
  editEvent: (event: EventProps) => void;
  deleteEvent: (id: string) => void;
}

const EditDeleteEvent: React.FC<EditDeleteEventProps> = ({ event, editEvent, deleteEvent }) => {
  const { id } = event;
  const [formData, setFormData] = useState<EventProps>(event);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [_uploadProgress, setUploadProgress] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseEdit = () => setShowModalEdit(false);
  const handleCloseDelete = () => setShowModalDelete(false);

  const eventManager = useContext(eventServiceContext);
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

  function EditWindow() {
    return (
      <>
        <Modal show={showModalEdit} onHide={handleCloseEdit} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>שינוי אירוע</Modal.Title>
          </Modal.Header>
          <Modal.Body>{editForm()}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }

  function editForm() {
    return (
      <CustomForm
        handleSaveAdd={handleSaveEdit} // make sure this function exists in your code
        handleTitleChange={handleTitleChange}
        handleDateChange={handleDateChange}
        handleImageChange={handleImageChange}
        handleDetailsChange={handleDetailsChange}
        handleCloseAddEvent={handleCloseEdit} // make sure this function exists in your code
        formData={event}
        MAX_CHARS_Title={MAX_CHARS_Title}
        MAX_CHARS_Details={MAX_CHARS_Details}
        requiredFields={{ title: false, date: false, image: false, details: false }}
      />
    );
  }

  function DeleteWindow() {
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
      <AdminMenu handleEdit={handleEdit} handleDelete={handleDelete} />
      {EditWindow()}
      {DeleteWindow()}
    </>
  );
};

export default EditDeleteEvent;
