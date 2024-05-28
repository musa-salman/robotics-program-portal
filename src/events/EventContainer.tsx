import EventCard, { EventProps } from './EventCard';
import { Button, Modal, Form, Carousel } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from './EventContext';
import { IEvent } from './Event';

type EventContainer = {
  eventsProps: EventProps[];
}

const EventContainer= () => {
  const [firstVisibleEventIndex, setFirstVisibleEventIndex] = useState(0);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(0);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function onEventDelete(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  function onEventEdit(event: EventProps) {
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      events[index] = event;
      setRender(render === 1 ? 0 : 1);
    }
  }

  const handleAddEvent = () => {
    handleShow();
  };
  const handleSaveAdd = () => {
    handleAdd();
    setShowModal(false);
  };

  const handleShiftEventsRight = () => {
    setFirstVisibleEventIndex(prevIndex => {
      if (events.length - prevIndex < 4) {
        return prevIndex; // Keep the index at 0 if it's already at 0
      }
      return prevIndex + 1; // Shift the index by 1 to the right
    });
  };

  const handleShiftEventsLeft = () => {
    setFirstVisibleEventIndex(prevIndex => {
      if (prevIndex === 0) {
        return 0; // Keep the index at 0 if it's already at 0
      }
      return prevIndex - 1; // Shift the index by 1 to the right
    });
  };

  const [formData, setFormData] = useState<EventProps>({
    date: '', // Provide initial value for date
    title: '', // Provide initial value for title
    details: '', // Provide initial value for details
    image: 'Robtics.png', // Provide initial value for image
    onEventDelete: (_id: string) => { }, // Change the parameter type from '_id: string' to 'id: number'
    onEventEdit: (_event: EventProps) => { },
    id: '' // Provide initial value for id
  });

  const eventRepository = useContext(EventContext);

  const event: IEvent = {
    date: formData.date,
    title: formData.title,
    details: formData.details,
    imageURL: formData.image,
    id: ''
  };

  async function handleAdd() {
    handleShow();
    const docRef = await eventRepository.create(event);
    formData.id = docRef.id;
    events.push(formData);
    setEvents(events);
    setRender(render === 1 ? 0 : 1);
  }

  function addWindow() {
    return (
      <>
        <Modal show={showModal} onHide={handleClose} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>הוסף אירוע</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addForm()}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
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
        setFormData(prevState => ({ ...prevState, details: value }));
        setCharCountDetails(value.length);
      }
    };

    const MAX_CHARS_Title = 17; // Set the maximum number of characters allowed
    const [_charCountTitle, setCharCountTitle] = useState(0); // Track the current character count

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= MAX_CHARS_Title) {
        setFormData(prevState => ({ ...prevState, title: value }));
        setCharCountTitle(value.length);
      }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prevState => ({ ...prevState, date: e.target.value }));
    };
  
    const handleImageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData(prevState => ({ ...prevState, image: e.target.value }));
    };
  

    return (
      <Form onSubmit={handleSaveAdd}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>כותרת</Form.Label>
        <Form.Control
          required type="text"
          placeholder="שם אירוע"
          onChange={handleTitleChange}
          maxLength={MAX_CHARS_Title} // Set the maximum length of the textarea
        />
      <small>{formData.title.length}/{MAX_CHARS_Title} אותיות</small> {/* Display the character count */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>תאריך</Form.Label>
        <Form.Control required type="date" placeholder="יום /חודש /שנה" onChange={handleDateChange} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>העלאת תמונה</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>פרטים</Form.Label>
        <Form.Control
          required as="textarea"
          rows={3}
          placeholder="פרטי האירוע"
          onChange={handleDetailsChange}
          maxLength={MAX_CHARS_Details} // Set the maximum length of the textarea
        />
        <small>{formData.details.length}/{MAX_CHARS_Details} אותיות</small> {/* Display the character count */}
      </Form.Group>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="secondary" onClick={handleClose}>
          סגור    
        </Button>
        <Button variant="primary" type="submit">
          הוסף
        </Button>
      </div>
      </Form>
    );
  }

  return (
    <div className='events'>
      <div className="eventsContainer">
        <Button variant="primary" onClick={handleShiftEventsRight}>&lt;</Button>
          {events.slice(firstVisibleEventIndex, firstVisibleEventIndex + 3).map((event) => (
            <EventCard
              id={event.id}
              date={event.date}
              title={event.title}
              details={event.details}
              image={event.image}
              onEventDelete={onEventDelete}
              onEventEdit={onEventEdit}
            />
          ))}
          <Button variant="primary" onClick={handleShiftEventsLeft}>&gt;</Button>
      </div>
        <Button variant="success" onClick={handleAddEvent}>הוסף אירוע</Button>
      {addWindow()}
    </div>
  );
};
export default EventContainer;