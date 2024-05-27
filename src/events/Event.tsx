import React, { useState } from 'react';
import { Button, Card, Dropdown, Modal, Form } from 'react-bootstrap';

import './Event.css';

export interface EventProps {
  date: string;
  title: string;
  details: string;
  image: string;
  onEventDelete: (id: number) => void;
  onEventEdit: (event: EventProps) => void;
  id: number;
}

const Event: React.FC<EventProps> = ({ date, title, details, image, onEventDelete, onEventEdit, id }) => {
  const [formData, setFormData] = useState<EventProps>({ date, title, details, image, onEventDelete, onEventEdit, id });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({ ...prevState, title: e.target.value }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prevState => ({ ...prevState, details: e.target.value }));
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

  function handleDelete() {
    handleShowDelete();
  }

  function handleEdit() {
    handleShowEdit();
  }

  function handleRegister() {
    handleShowRegister();
  }

  const handleSaveEdit = () => {
    onEventEdit(formData);
    setShowModalEdit(false);
    //db
  };

  const handleSaveDelete = () => {
    onEventDelete(id);
    setShowModalDelete(false);
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
          <Form.Control type="text" defaultValue={title} onChange={handleTitleChange} />
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
          <Form.Control as="textarea" rows={3} defaultValue={details} onChange={handleDetailsChange} />
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
export default Event;