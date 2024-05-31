import React, { useContext, useState } from 'react';
import { EventContext } from './EventContext';
import { Button, Card, Dropdown, Modal, Form } from 'react-bootstrap';

import './EventCard.css';
import { IEvent } from './Event';

export interface EventProps {
  date: string;
  title: string;
  details: string;
  image: string;
  onEventDelete: (id: string) => void;
  onEventEdit: (event: EventProps) => void;
  id: string;
}

const EventCard: React.FC<EventProps> = ({ date, title, details, image, onEventDelete, onEventEdit, id }) => {
  const [formData, setFormData] = useState<EventProps>({ date, title, details, image, onEventDelete, onEventEdit, id });

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

  const eventRepository = useContext(EventContext);


  function handleDelete() {
    handleShowDelete();
  }

  function handleEdit() {
    handleShowEdit();
  }

  function handleRegister() {
    handleShowRegister();
  }

  const handleSaveEdit = async () => {
    const event: IEvent = {
      date: formData.date,
      title: formData.title,
      details: formData.details,
      imageURL: formData.image,
      id: formData.id
    };
    onEventEdit(formData);
    setShowModalEdit(false);
    await eventRepository.update(id, event);
    //db
  };

  const handleSaveDelete = async () => {
    onEventDelete(id);
    setShowModalDelete(false);
    await eventRepository.delete(id);
    //db
  };

  const handleSaveRegister = () => {
    setRegister(true);
    setShowModalRegister(false);
    //db
  };

  function adminOptions() {
    return (
      <div className="adminOptions">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">

          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleEdit}>לַעֲרוֹך</Dropdown.Item>
            <p></p>
            <Dropdown.Item onClick={handleDelete} style={{ color: 'red' }}>לִמְחוֹק</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  function editWindow() {
    return (
      <>
        <Modal show={showModalEdit} onHide={handleCloseEdit} animation={false} style={{ display: 'center' }}>
          <Modal.Header closeButton>
            <Modal.Title>שינוי אירוע</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editForm()}
          </Modal.Body>
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
        <small>{formData.title.length}/{MAX_CHARS_Title} אותיות</small> {/* Display the character count */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>תאריך</Form.Label>
          <Form.Control type="date" defaultValue={date} onChange={handleDateChange} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>העלאת תמונה</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
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
          <small>{formData.details.length}/{MAX_CHARS_Details} אותיות</small> {/* Display the character count */}
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
                <Button variant="primary" type='submit'>
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
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <p><strong>תאריך:</strong> {date}</p>
          <p><strong>פרטים:</strong> {details}</p>
        </Card.Text>
        {registerd ? (
          <Button variant="secondary" disabled>רשום</Button>
          ) : (
          <Button variant="primary" onClick={handleRegister}>הירשם</Button>
        )}
        {adminOptions()}
      </Card.Body>
      {editWindow()}
      {deleteWindow()}
      {registerWindow()}
    </Card>
  );
};
export default EventCard;