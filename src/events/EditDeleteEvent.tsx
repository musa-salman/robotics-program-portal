import React, { useState, useContext } from 'react';
import { EventProps } from './EventCard';
import { IEvent } from './repository/Event';
import { useEventService } from './repository/EventContext';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import AdminMenu from './AdminOptions';
import EventForm from './EventForm';
import Modal from '@mui/material/Modal';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';
import DeleteModal from '../study-material/DeleteModal';

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
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseEdit = () => setShowModalEdit(false);
  const handleCloseDelete = () => setShowModalDelete(false);

  const eventRepository = useEventService().eventRepository;
  const storageService = useContext(StorageServiceContext);

  const MAX_CHARS_Details = 100;
  const MAX_CHARS_Title = 17;

  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

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

  const handleSaveEdit = () => {
    const event: IEvent = {
      date: formData.date,
      title: formData.title,
      details: formData.details,
      imageURL: formData.image,
      id: formData.id
    };

    setShowModalEdit(false);
    if (file) {
      storageService.upload(file, '/event-img/' + id).then(() => {
        const storage = getStorage();
        const filePath = '/event-img/' + id;
        getDownloadURL(ref(storage, filePath))
          .then((url) => {
            event.imageURL = url;
            formData.image = url;
            eventRepository.update(id, event).then(() => {
              editEvent(formData);
            });
            showMessage({
              message: 'האירוע עודכן בהצלחה!',
              variant: 'success'
            });
          })
          .catch(() => {
            showMessage({
              message: 'התרחשה שגיעה בעת עדכון האירוע. אנא נסה שנית.',
              variant: 'error'
            });
          });
      });
    } else {
      eventRepository
        .update(id, event)
        .then(() => {
          editEvent(formData);
          showMessage({
            message: 'האירוע עודכן בהצלחה!',
            variant: 'success'
          });
        })
        .catch(() => {
          showMessage({
            message: 'התרחשה שגיעה בעת עדכון האירוע. אנא נסה שנית.',
            variant: 'error'
          });
        });
    }
  };

  //FIXME: handleSaveDelete FeedbackMessage is not working well on success
  const handleSaveDelete = () => {
    setShowModalDelete(false);
    eventRepository
      .delete(id)
      .then(async () => {
        const filePath = '/event-img/' + id;
        // Delete the file
        await storageService.exists(filePath).then((exists) => {
          if (!exists) {
            return;
          }
          storageService.delete(filePath);
        });
        deleteEvent(id);
        showMessage({
          message: 'אירוע נמחק בהצלחה!',
          variant: 'success'
        });
      })
      .catch(() => {
        showMessage({
          message: 'התרחשה שגיעה בעת מחיקת האירוע. אנא נסה שנית.',
          variant: 'error'
        });
      });
  };

  function handleEdit(): void {
    setShowModalEdit(true);
  }

  function handleDelete(): void {
    setShowModalDelete(true);
  }

  function EditWindow() {
    return (
      <Modal
        open={showModalEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <EventForm
          handleSaveAdd={handleSaveEdit} // make sure this function exists in your code
          handleTitleChange={handleTitleChange}
          handleDateChange={handleDateChange}
          handleImageChange={handleImageChange}
          handleDetailsChange={handleDetailsChange}
          handleCloseAddEvent={handleCloseEdit} // make sure this function exists in your code
          formData={event}
          MAX_CHARS_Title={MAX_CHARS_Title}
          MAX_CHARS_Details={MAX_CHARS_Details}
          requiredFields={{ add: false }}
        />
      </Modal>
    );
  }

  function DeleteWindow() {
    return (
      <>
        {showModalDelete && (
          <DeleteModal
            onDelete={handleSaveDelete}
            onCancel={() => handleCloseDelete}
            message={'האם אתה בטוח שברצונך למחוק את האירוע הזה'}
          />
        )}
      </>
    );
  }

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      <AdminMenu handleEdit={handleEdit} handleDelete={handleDelete} />
      {EditWindow()}
      {DeleteWindow()}
    </>
  );
};

export default EditDeleteEvent;
