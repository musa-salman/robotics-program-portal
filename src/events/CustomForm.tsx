import React from 'react';
import { Form, Button } from 'react-bootstrap';

type CustomFormProps = {
  handleSaveAdd: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetailsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCloseAddEvent: () => void;
  formData: any; // Replace 'any' with the actual type of formData
  MAX_CHARS_Title: number;
  MAX_CHARS_Details: number;
  requiredFields: {
    title: boolean;
    date: boolean;
    image: boolean;
    details: boolean;
  };
};

const CustomForm: React.FC<CustomFormProps> = ({
  handleSaveAdd,
  handleTitleChange,
  handleDateChange,
  handleImageChange,
  handleDetailsChange,
  handleCloseAddEvent,
  formData,
  MAX_CHARS_Title,
  MAX_CHARS_Details,
  requiredFields
}) => (
  <Form onSubmit={handleSaveAdd}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>כותרת</Form.Label>
      <Form.Control
        required={requiredFields.title}
        type="text"
        placeholder="שם אירוע"
        onChange={handleTitleChange}
        maxLength={MAX_CHARS_Title}
        defaultValue={formData.title}
      />
      <small>
        {formData.title.length}/{MAX_CHARS_Title} אותיות
      </small>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>תאריך</Form.Label>
      <Form.Control
        required={requiredFields.date}
        type="date"
        placeholder="יום /חודש /שנה"
        onChange={handleDateChange}
        defaultValue={formData.data}
      />
    </Form.Group>
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>העלאת תמונה</Form.Label>
      <Form.Control required={requiredFields.image} type="file" accept="image/*" onChange={handleImageChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>פרטים</Form.Label>
      <Form.Control
        required={requiredFields.details}
        as="textarea"
        rows={3}
        placeholder="פרטי האירוע"
        onChange={handleDetailsChange}
        maxLength={MAX_CHARS_Details}
        defaultValue={formData.details}
      />
      <small>
        {formData.details.length}/{MAX_CHARS_Details} אותיות
      </small>
    </Form.Group>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="secondary" onClick={handleCloseAddEvent}>
        סגור
      </Button>
      <Button variant="primary" type="submit">
        {requiredFields.title ? 'הוסף' : 'שמור שינויים'}
      </Button>
    </div>
  </Form>
);

export default CustomForm;
