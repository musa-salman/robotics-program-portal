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
import { Moment } from 'moment';

interface AddEventProps {
  addEvent: (event: EventProps) => void;
}

const AddEvent: React.FC<AddEventProps> = ({ addEvent }) => {
  const MAX_CHARS_Title = 17;
  const MAX_CHARS_Details = 100;

  // Define the feedback message
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);
  const [isForward, setIsForward] = useState(false);

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

  const handleStartDateChange = (date: Moment) => {
    setFormData((prevState) => ({ ...prevState, startDate: date.toDate() }));
  };

  const handleEndDateChange = (date: Moment) => {
    setFormData((prevState) => ({ ...prevState, endDate: date.toDate() }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, image: e.target.value }));
    setFile(e.target.files?.[0] || null); // Provide a default value of null for the file state variable
  };

  const [file, setFile] = useState<File | null>(null);
  const [showModalAddEvent, setShowModalAddEvent] = useState(false);

  const handleCloseAddEvent = () => {
    setShowModalAddEvent(false);
    returnDefaultValues();
  };
  const handleShowAddEvent = () => setShowModalAddEvent(true);

  const eventRepository = useEventService().eventRepository;
  const storageService = useContext(StorageServiceContext);

  const [formData, setFormData] = useState<EventProps>({
    startDate: new Date(), // Provide initial value for startDate
    endDate: new Date(), // Provide initial value for endDate
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
  };

  const event: IEvent = {
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    title: formData.title,
    details: formData.details,
    imageURL: formData.image,
    id: ''
  };

  async function handleAdd() {
    handleShowAddEvent();
    if (event.title !== '' && event.details !== '') {
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
          showMessage({
            message: 'אירוע נוסף בהצלחה!',
            variant: 'success'
          });
        })
        .catch(() => {
          showMessage({
            message: 'התרחשה שגיעה בעת הוספת האירוע. אנא נסה שנית.',
            variant: 'error'
          });
        });
      returnDefaultValues();
      setShowModalAddEvent(false);
      setIsForward(true);
    }
  }

  function returnDefaultValues() {
    setFormData({
      startDate: new Date(),
      endDate: new Date(),
      title: '',
      details: '',
      image: './DefultEventImg.png',
      onEventDelete: (_id: string) => {},
      onEventEdit: (_event: EventProps) => {},
      id: ''
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
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleImageChange={handleImageChange}
          handleDetailsChange={handleDetailsChange}
          handleCloseAddEvent={handleCloseAddEvent}
          formData={event}
          MAX_CHARS_Title={MAX_CHARS_Title}
          MAX_CHARS_Details={MAX_CHARS_Details}
          requiredFields={{ add: true }}
          isForward={isForward}
        />
      </Modal>
    );
  }

  return (
    <>
      <Button variant="contained" className="add-button" onClick={handleAddEvent}>
        <AddIcon />
      </Button>
      {AddWindow()}
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
    </>
  );
};

export default AddEvent;
