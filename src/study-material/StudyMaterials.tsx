import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import { useContext, useState } from 'react';
import { StudyMaterial } from './StudyMaterial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { StudyMaterialContext } from './StudyMaterialContext';

const styles = {
  fontSize: '20px',
  color: 'black',
  padding: '5px'
};

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
    // Construct the updated study material object with the new title and description
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

  const momentDate = moment(studyMaterial.date.toDate()).format('DD / MM / YYYY');

  return (
    <Card className={'Card'}>
      <Card.Body>
        <div>
          {isEditing ? (
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          ) : (
            <Card.Title style={styles}>{studyMaterial.title}</Card.Title>
          )}
        </div>
        <hr className="custom-hr" />
        <div>
          {isEditing ? (
            <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
          ) : (
            <Card.Text style={styles}>{studyMaterial.description || 'תאור קצר על הקובץ'}</Card.Text>
          )}
        </div>
        <p style={styles}> תאריך : {momentDate} </p>
        <br />
        <div className="btns">
          <Button className="button" onClick={handleDownload}>
            <FontAwesomeIcon icon={faFileArrowDown} />
          </Button>
          <Button className="button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          {isEditing ? (
            <Button className="button" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button className="button" onClick={handleEditToggle}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default StudyMaterials;
