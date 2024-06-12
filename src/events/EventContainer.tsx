import EventCard, { EventProps } from './EventCard';
import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from './EventContext';
import { IEvent } from './Event';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import AddIcon from '@mui/icons-material/Add';
import './EventContainer.css';

type EventContainer = {
  eventsProps: EventProps[];
};

const EventContainer = () => {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [showModalAddEvent, setShowModalAddEvent] = useState(false);
  const [render, setRender] = useState(0);
  const handleCloseAddEvent = () => setShowModalAddEvent(false);
  const handleShowAddEvent = () => setShowModalAddEvent(true);
  const [_uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const eventRepository = useContext(EventContext);
  const storageService = useContext(StorageServiceContext);

  const [showModalAllEvents, setShowModalAllEvents] = useState(false);
  const handleCloseAllEvents = () => setShowModalAllEvents(false);
  const handleShowAllEvents = () => setShowModalAllEvents(true);

  const handleAllEvents = () => {
    handleShowAllEvents();
  };

  const handleShiftEventsRight = () => {
    if (events !== null) setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleShiftEventsLeft = () => {
    if (events !== null) setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, events.length - 3));
  };

  useEffect(() => {
    const getEvents = async () => {
      setEvents(convertIEventsToEventProps(await eventRepository.find()));
    };
    if (events === null) getEvents();
  }, [events]);

  function convertIEventsToEventProps(events: IEvent[]): EventProps[] {
    return events.map((event) => {
      return {
        date: event.date,
        title: event.title,
        details: event.details,
        image: event.imageURL,
        id: event.id,
        onEventDelete: onEventDelete,
        onEventEdit: onEventEdit
      };
    });
  }

  function onEventDelete(id: string) {
    setEvents((events || []).filter((e) => e.id !== id));
    setRender(render === 1 ? 0 : 1);
  }

  function onEventEdit(event: EventProps) {
    const index = (events || []).findIndex((e) => e.id === event.id);
    if (index !== -1) {
      (events || [])[index] = event;
      setRender(render === 1 ? 0 : 1);
    }
  }

  const handleAddEvent = () => {
    handleShowAddEvent();
  };
  const handleSaveAdd = () => {
    handleAdd();
    setShowModalAddEvent(false);
  };

  const [formData, setFormData] = useState<EventProps>({
    date: new Date(), // Provide initial value for date
    title: '', // Provide initial value for title
    details: '', // Provide initial value for details
    image:
      'https://firebasestorage.googleapis.com/v0/b/pico-7a9d2.appspot.com/o/event-img%2FRobtics.png?alt=media&token=ebd02a49-3e7a-4165-8580-825a2d5a0a5d', // Provide initial value for image
    onEventDelete: (_id: string) => {}, // Change the parameter type from '_id: string' to 'id: number'
    onEventEdit: (_event: EventProps) => {},
    id: '' // Provide initial value for id
  });

  const event: IEvent = {
    date: new Date(formData.date),
    title: formData.title,
    details: formData.details,
    imageURL: formData.image,
    id: ''
  };

  async function handleAdd() {
    handleShowAddEvent();
    const docRef = await eventRepository.create(event);
    event.id = docRef.id;
    if (file) {
      await storageService.upload(
        file,
        '/event-img/' + docRef.id,
        setUploadProgress,
        (_error) => {},
        () => {
          const storage = getStorage();
          const filePath = '/event-img/' + docRef.id;
          // Get the download URL
          getDownloadURL(ref(storage, filePath)).then((url) => {
            event.imageURL = url;
            formData.image = url;
            eventRepository.update(docRef.id, event);
            events?.push(formData);
            setRender(render === 1 ? 0 : 1);
          });
        }
      );
    } else {
      events?.push(formData);
      setRender(render === 1 ? 0 : 1);
    }
  }

  function addWindow() {
    return (
      <>
        <Modal show={showModalAddEvent} onHide={handleCloseAddEvent} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>הוסף אירוע</Modal.Title>
          </Modal.Header>
          <Modal.Body>{addForm()}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }

  function addForm() {
    const MAX_CHARS_Details = 100; // Set the maximum number of characters allowed
    const [_charCountDetails, setCharCountDetails] = useState(0); // Track the current character count

    const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= MAX_CHARS_Details) {
        setFormData((prevState) => ({ ...prevState, details: value }));
        setCharCountDetails(value.length);
      }
    };

    const MAX_CHARS_Title = 17; // Set the maximum number of characters allowed
    const [_charCountTitle, setCharCountTitle] = useState(0); // Track the current character count

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= MAX_CHARS_Title) {
        setFormData((prevState) => ({ ...prevState, title: value }));
        setCharCountTitle(value.length);
      }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({ ...prevState, date: e.target.valueAsDate! }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prevState) => ({ ...prevState, image: formData.image }));
      setFile(e.target.files?.[0] || null); // Provide a default value of null for the file state variable
    };

    return (
      <Form onSubmit={handleSaveAdd}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>כותרת</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="שם אירוע"
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
          <Form.Control required type="date" placeholder="יום /חודש /שנה" onChange={handleDateChange} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>העלאת תמונה</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>פרטים</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            placeholder="פרטי האירוע"
            onChange={handleDetailsChange}
            maxLength={MAX_CHARS_Details} // Set the maximum length of the textarea
          />
          <small>
            {formData.details.length}/{MAX_CHARS_Details} אותיות
          </small>{' '}
          {/* Display the character count */}
        </Form.Group>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={handleCloseAddEvent}>
            סגור
          </Button>
          <Button variant="primary" type="submit">
            הוסף
          </Button>
        </div>
      </Form>
    );
  }

  function showAll() {
    return (
      <Modal className="show-all-events" show={showModalAllEvents} onHide={handleCloseAllEvents}>
        {events?.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            date={event.date}
            title={event.title}
            details={event.details}
            image={event.image}
            onEventDelete={onEventDelete}
            onEventEdit={onEventEdit}
          />
        ))}
      </Modal>
    );
  }

  return (
    <div className="events">
      <div className="eventsContainer">
        {events && events.length > 0 && (
          <Button className="shift-buttons" variant="primary" onClick={handleShiftEventsRight}>
            &lt;
          </Button>
        )}
        {events && events.length > 0 ? (
          events
            .sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(currentIndex, currentIndex + 3)
            .map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                date={event.date}
                title={event.title}
                details={event.details}
                image={event.image}
                onEventDelete={onEventDelete}
                onEventEdit={onEventEdit}
              />
            ))
        ) : (
          <div className="emptyCard">אין אירועים, הוסף אירוע</div>
        )}
        {events && events.length > 0 && (
          <Button className="shift-buttons" variant="primary" onClick={handleShiftEventsLeft}>
            &gt;
          </Button>
        )}
      </div>
      <Button className="addButton" onClick={handleAddEvent}>
        <AddIcon />
      </Button>

      <Button className="showAll" onClick={handleAllEvents}>
        show
      </Button>
      {addWindow()}
      {showAll()}
    </div>
  );
};
export default EventContainer;
