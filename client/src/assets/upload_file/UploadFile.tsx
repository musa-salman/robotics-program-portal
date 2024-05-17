import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

class SaveFile {

  private fileName: string;
  private description: string;
  private file: File;
  private dateUpload: string;

  constructor(name: string, description: string, file: File, dateUpload: string) {
    this.fileName = name;
    this.description = description;
    this.file = file;
    this.dateUpload = dateUpload;
  }

  getFileName(): string {
    return this.fileName
  }

  getFileDescription(): string {
    return this.description;
  }

  getFile(): File {
    return this.file;
  }

  getFileDateUpload(): string {
    return this.dateUpload;
  }

  setFileName(fileName: string) {
    this.fileName = fileName;
  }

  setFileDescripshen(description: string) {
    this.description = description;
  }

  setFilePath(file: File) {
    this.file = file;
  }

  setFileDateUpload(dateUpload: string) {
    this.dateUpload = dateUpload;
  }

}
  

function UploadFile() {

 

  const [name, setname] = useState({name: '', weight: '', height: ''});

  return (
    <>
      <Form  className='bg-light border border-primary rounded shadow-lg bg py-4 px-5'>
        <Row className="mb-3 position-flex">
          <Form.Group
            as={Col}
            controlId="validationFormik101"
            className="position-relative"
          >
            <Col sm={15}>
              <FloatingLabel
                controlId="floatingInput"
                label="כותרת"
              >
                <Form.Control
                  type="text"
                  name="nameFile"
                  // value={values.nameFile}
                  placeholder="כותרת"
                  // onChange={handleChange}
                  // isValid={touched.nameFile && !errors.nameFile}
                />
              </FloatingLabel>
            </Col>
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>

          </Form.Group>
          <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
            <ButtonGroup className='mt-3'>
            <DropdownButton as={ButtonGroup} title="כיתה" id="bg-nested-dropdown ">
              <Dropdown.Item eventKey="1">א</Dropdown.Item>
              <Dropdown.Item eventKey="2">ב</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          </Form.Group>
        </Row>

        <Form.Group className="position-relative my-3">
          <Form.Control
            type="file"
            required
            name="file"
            // onChange={handleChange}
            // isInvalid={!!errors.file}
          />
          {/* <Form.Control.Feedback type="invalid" tooltip>
            {errors.file}
          </Form.Control.Feedback> */}
        </Form.Group>

        <FloatingLabel className='my-3' controlId="floatingTextarea1" label="Comments">
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
        </FloatingLabel>

        <Button type="submit">Submit form</Button>

      </Form>
        
    </>
  );
}

export default UploadFile;