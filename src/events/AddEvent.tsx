import React, { useContext, useState } from 'react';
import { EventProps } from './EventCard';
import { IEvent } from './repository/Event';
import { useEventService } from './repository/EventContext';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import EventForm from './EventForm';
import { Modal } from '@mui/material';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';

interface AddEventProps {
  addEvent: (event: EventProps) => void;
}

const AddEvent: React.FC<AddEventProps> = ({ addEvent }) => {
  const MAX_CHARS_Title = 17;
  const MAX_CHARS_Details = 100;

  // Define the feedback message
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | undefined>(undefined);

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
    setFormData((prevState) => ({ ...prevState, image: formData.image }));
    setFile(e.target.files?.[0] || null); // Provide a default value of null for the file state variable
  };

  const [file, setFile] = useState<File | null>(null);
  const [showModalAddEvent, setShowModalAddEvent] = useState(false);

  const handleCloseAddEvent = () => setShowModalAddEvent(false);
  const handleShowAddEvent = () => setShowModalAddEvent(true);

  const eventRepository = useEventService().eventRepository;
  const storageService = useContext(StorageServiceContext);

  const [formData, setFormData] = useState<EventProps>({
    date: new Date(), // Provide initial value for date
    title: '', // Provide initial value for title
    details: '', // Provide initial value for details
    image: './DefultEventImg.png', // Provide initial value for image
    onEventDelete: (_id: string) => {}, // Change the parameter type from '_id: string' to 'id: number'
    onEventEdit: (_event: EventProps) => {},
    id: '' // Provide initial value for id
  });

  const handleAddEvent = () => {
    handleShowAddEvent();
  };

  const handleSaveAdd = () => {
    handleAdd();
    setShowModalAddEvent(false);
  };

  const event: IEvent = {
    date: new Date(formData.date),
    title: formData.title,
    details: formData.details,
    imageURL: formData.image,
    id: ''
  };

  async function handleAdd() {
    handleShowAddEvent();
    eventRepository
      .create(event)
      .then((docRef) => {
        event.id = docRef.id;
        formData.id = docRef.id;
        if (file) {
          storageService.upload(file, '/event-img/' + docRef.id).then(async () => {
            const storage = getStorage();
            const filePath = '/event-img/' + docRef.id;
            // Get the download URL
            await getDownloadURL(ref(storage, filePath)).then(async (url) => {
              event.imageURL = url;
              formData.image = url;
              await eventRepository.update(docRef.id, event).then(() => {
                addEvent(formData);
              });
            });
          });
        } else {
          formData.image = event.imageURL;
          addEvent(formData);
        }
        //success message
        setFeedbackMessage({
          message: 'אירוע נוסף בהצלחה!',
          variant: 'success'
        });
      })
      .catch(() => {
        setFeedbackMessage({
          message: 'התרחשה שגיעה בעת הוספת האירוע. אנא נסה שנית.',
          variant: 'error'
        });
      });
  }

  function AddWindow() {
    return (
      <Modal
        open={showModalAddEvent}
        onClose={handleCloseAddEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <EventForm
          handleSaveAdd={handleSaveAdd}
          handleTitleChange={handleTitleChange}
          handleDateChange={handleDateChange}
          handleImageChange={handleImageChange}
          handleDetailsChange={handleDetailsChange}
          handleCloseAddEvent={handleCloseAddEvent}
          formData={event}
          MAX_CHARS_Title={MAX_CHARS_Title}
          MAX_CHARS_Details={MAX_CHARS_Details}
          requiredFields={{ add: false }}
        />
      </Modal>
    );
  }

  return (
    <>
      <Button className="add-button" onClick={handleAddEvent}>
        <AddIcon />
      </Button>
      {AddWindow()}
      {feedbackMessage && <FeedbackSnackbar key={feedbackMessage.message} feedBackMessage={feedbackMessage} />}
    </>
  );
};

export default AddEvent;
