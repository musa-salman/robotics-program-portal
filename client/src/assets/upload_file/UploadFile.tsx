import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';

import { getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { useState } from 'react';
import { storage } from '../firebase';
// import { storage } from '../firebase';




  
const UploadFileComponent: React.FC<{}> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const storageRef = ref(storage,"name.txt");

    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed',
      (snapshot:any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error:any) => {
        console.error('Error uploading file:', error);
      },
      () => {
        // Upload completed successfully, now get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
      }
    );
  };
  
  // function UploadFile() {
    return (
      <>
        <Form  className='bg-light border border-primary rounded shadow-lg bg py-4 px-5 '>
          <h1>
            <Badge className='px-5 mb-3' bg="secondary">העלת קובץ</Badge>
          </h1>

          
          <Form.Group
            as={Col}
            controlId="validationFormik101"
            className="position-relative "
            
          >
            <FloatingLabel
              controlId="floatingInput"
              label="כותרת"
            >
            <Form.Control
              type="text"
              id="name"
              required
              placeholder="כותרת"
              
            />
          </FloatingLabel>
            
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>

          </Form.Group>

          <Form.Group className="position-relative my-3 ">
            <Form.Control
              type="file"
              required
              name="file"
              className="position-relative my-4 "
              onChange={handleFileChange}
              
            />
          </Form.Group>

          <FloatingLabel className='my-3' controlId="floatingTextarea1" label="תיאור">
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
  
          <Button className='px-5 my-3' onSubmit={handleUpload} type="submit">העלה</Button>
  
        </Form> 
      </>
    );
  // }

};




export default UploadFileComponent;