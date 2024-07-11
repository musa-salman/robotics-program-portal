import React, { useState, useContext } from 'react';
import { EventProps } from './EventCard';
import { IEvent } from './repository/Event';
import { useEventService } from './repository/EventContext';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import AdminMenu from './AdminOptions';
import CustomForm from './CustomForm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface EditDeleteEventProps {
  event: EventProps;
  editEvent: (event: EventProps) => void;
  deleteEvent: (id: string) => void;
}

const EditDeleteEvent: React.FC<EditDeleteEventProps> = ({ event, editEvent, deleteEvent }) => {
  const { id } = event;
  const [formData, setFormData] = useState<EventProps>(event);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseEdit = () => setShowModalEdit(false);
  const handleCloseDelete = () => setShowModalDelete(false);

  const eventRepository = useEventService().eventRepository;
  const storageService = useContext(StorageServiceContext);

  const MAX_CHARS_Details = 100;
  const MAX_CHARS_Title = 17;

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
    setFormData((prevState) => ({ ...prevState, image: e.target.value }));
    setFile(e.target.files?.[0] || null);
  };

  const handleSaveEdit = async () => {
    const event: IEvent = {
      date: formData.date,
      title: formData.title,
      details: formData.details,
      imageURL: formData.image,
      id: formData.id
    };

    setShowModalEdit(false);
    if (file) {
      await storageService.upload(file, '/event-img/' + id).then(() => {
        const storage = getStorage();
        const filePath = '/event-img/' + id;
        getDownloadURL(ref(storage, filePath)).then((url) => {
          event.imageURL = url;
          formData.image = url;
          editEvent(formData);
          eventRepository.update(id, event);
        });
      });
    } else {
      editEvent(formData);
      eventRepository.update(id, event);
    }
  };

  const handleSaveDelete = async () => {
    deleteEvent(id);
    eventRepository.delete(id);
    setShowModalDelete(false);
    const filePath = '/event-img/' + id;
    // Delete the file
    storageService.delete(filePath);
  };

  function handleEdit(): void {
    setShowModalEdit(true);
  }

  function handleDelete(): void {
    setShowModalDelete(true);
  }

  function EditWindow() {
    return (
      <Dialog open={showModalEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          שינוי אירוע
          <IconButton aria-label="close" onClick={handleCloseEdit} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{editForm()}</DialogContent>
        {/* DialogActions can be used here if you have any actions like 'Save' or 'Cancel' */}
      </Dialog>
    );
  }

  function editForm() {
    return (
      <CustomForm
        handleSaveAdd={handleSaveEdit} // make sure this function exists in your code
        handleTitleChange={handleTitleChange}
        handleDateChange={handleDateChange}
        handleImageChange={handleImageChange}
        handleDetailsChange={handleDetailsChange}
        handleCloseAddEvent={handleCloseEdit} // make sure this function exists in your code
        formData={event}
        MAX_CHARS_Title={MAX_CHARS_Title}
        MAX_CHARS_Details={MAX_CHARS_Details}
        requiredFields={{ add: false }}
      />
    );
  }

  function DeleteWindow() {
    return (
      <Dialog
        open={showModalDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">האם אתה בטוח שברצונך למחוק את האירוע הזה</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">אתה לא יכול לחזור אחורה לאחר מחיקת האירוע</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            סגור
          </Button>
          <Button onClick={handleSaveDelete} color="error">
            לִמְחוֹק
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <AdminMenu handleEdit={handleEdit} handleDelete={handleDelete} />
      {EditWindow()}
      {DeleteWindow()}
    </>
  );
};

export default EditDeleteEvent;
