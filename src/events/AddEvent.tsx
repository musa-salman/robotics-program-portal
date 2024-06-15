// AddEvent.tsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { EventProps } from './EventCard';

type AddEventProps = {
  setFormData: React.Dispatch<React.SetStateAction<EventProps>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleSaveAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCloseAddEvent: () => void;
};

export function AddEvent({ setFormData, setFile, handleSaveAdd, handleCloseAddEvent }: AddEventProps) {
  const MAX_CHARS_Title = 17; // Set the maximum number of characters allowed
  const MAX_CHARS_Details = 100; // Set the maximum number of characters allowed

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS_Details) {
      setFormData((prevState: any) => ({ ...prevState, details: value }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS_Title) {
      setFormData((prevState: any) => ({ ...prevState, title: value }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({ ...prevState, date: e.target.valueAsDate! }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement & { files: FileList }>) => {
    setFormData((prevState: any) => ({ ...prevState, image: e.target.files?.[0] }));
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
