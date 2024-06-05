import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import { useContext, useState } from 'react';
import { StudyMaterial } from './StudyMaterial';
import moment from 'moment';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { StudyMaterialContext } from './StudyMaterialContext';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type UpdateHandler = (updatedMaterial: StudyMaterial) => void;
type DeleteHandler = (deletedItemId: string) => void;

function StudyMaterials({
  studyMaterial,
  onUpdate,
  onDelete
}: {
  studyMaterial: StudyMaterial;
  onUpdate: UpdateHandler;
  onDelete: DeleteHandler;
}) {
  const storageService = useContext(StorageServiceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(studyMaterial.title);
  const [editedDescription, setEditedDescription] = useState(studyMaterial.description);
  const studyMaterialRepository = useContext(StudyMaterialContext);

  const handleDownload = async () => {
    storageService.download(
      '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename,
      studyMaterial.filename
    );
  };

  const handleDelete = async () => {
    storageService.delete('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename);
    studyMaterialRepository.delete(studyMaterial.id);
    onDelete(studyMaterial.id);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const updatedStudyMaterial = {
      ...studyMaterial,
      title: editedTitle,
      description: editedDescription
    };

    studyMaterialRepository
      .update(studyMaterial.id, updatedStudyMaterial)
      .then(() => {
        onUpdate(updatedStudyMaterial);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating study material:', error);
      });
  };

  const momentDate = moment(studyMaterial.date).format('DD / MM / YYYY');

  return (
    <Card className="Card">
      <Button className="bu-more">
        <MoreVertIcon />
      </Button>
      <Card.Body className="bodycard">
        {isEditing ? (
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
        ) : (
          <Card.Title className="title-card">{studyMaterial.title}</Card.Title>
        )}
        <hr className="custom-hr" />
        <div>
          {isEditing ? (
            <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
          ) : (
            <Card.Text className="description">{studyMaterial.description}</Card.Text>
          )}
        </div>
        <p className="date"> תאריך : {momentDate} </p>
        {/* <div className="btns"> */}
        <Button className="dow-button" onClick={handleDownload}>
          הורדה
          <DownloadIcon className="dow-icon" />
        </Button>
        {/* <Button className="button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button> */}
        {/* {isEditing ? (
            <Button className="button" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button className="button" onClick={handleEditToggle}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          )} */}
        {/* </div> */}
      </Card.Body>
    </Card>
  );
}
export default StudyMaterials;
