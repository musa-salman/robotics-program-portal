import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MaterialCard.css';
import { useContext, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { TextField } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { StorageServiceContext } from '../../storage-service/StorageContext';
import { MaterialContext } from '../repository/StudyMaterialContext';
import SimpleSnackbar from '../../components/snackbar/SnackBar';
import GPT from '../../gpt-service/GPTComponent';
import { suggestMaterialTitles } from './upload-file/StudyMaterialPrompts';
import formatDate from '../../utils/dateFormatter';

type UpdateHandler = (updatedMaterial: StudyMaterial) => void;
type DeleteHandler = (studyMaterial: StudyMaterial) => void;
type MoveHandler = (studyMaterial: StudyMaterial) => void;

function MaterialCard({
  studyMaterial,
  onUpdate,
  onDelete,
  onMove
}: {
  studyMaterial: StudyMaterial;
  onUpdate: UpdateHandler;
  onDelete: DeleteHandler;
  onMove: MoveHandler;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(studyMaterial.title);
  const [editedDescription, setEditedDescription] = useState(studyMaterial.description);

  const storageService = useContext(StorageServiceContext);
  const materialService = useContext(MaterialContext);

  const handleDownload = async () => {
    storageService.download(
      '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename,
      studyMaterial.filename
    );
    <SimpleSnackbar message="DOWNLOAD success" />;
  };

  const handleDelete = async () => {
    storageService.delete('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename).then(() => {
      materialService.studyMaterialRepository.delete(studyMaterial.id).then(() => onDelete(studyMaterial));
    });
    // TODO catch
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const updatedStudyMaterial = {
      ...studyMaterial,
      title: editedTitle,
      description: editedDescription
    };

    materialService.studyMaterialRepository
      .update(studyMaterial.id, updatedStudyMaterial)
      .then(() => {
        const updatedStudyMaterial = { ...studyMaterial, title: editedTitle, description: editedDescription };
        onUpdate(updatedStudyMaterial);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating study material:', error);
      });
  };

  const handleMoveToggle = () => {
    onMove(studyMaterial);
  };

  return (
    <Card className="Card">
      <MySpeedDial
        handleEditToggle={handleEditToggle}
        handleMoveToggle={handleMoveToggle}
        handleSave={handleSave}
        handleDelete={handleDelete}
        isEditing={isEditing}
      />
      <br />
      <Card.Body className="bodycard">
        {isEditing ? (
          <GPT initialValue={editedTitle} getData={() => suggestMaterialTitles(studyMaterial)}>
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </GPT>
        ) : (
          <Card.Title className="title-card">{studyMaterial.title}</Card.Title>
        )}
        <hr className="custom-hr" />
        <div>
          {isEditing ? (
            <GPT initialValue={editedDescription} getData={() => suggestMaterialTitles(studyMaterial)}>
              <TextField
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
            </GPT>
          ) : (
            <Card.Text className="description">{studyMaterial.description}</Card.Text>
          )}
        </div>
        <p className="date"> תאריך : {formatDate(studyMaterial.date)}</p>
        <Button className="dow-button" onClick={handleDownload}>
          הורדה
          <DownloadIcon className="dow-icon" />
        </Button>
      </Card.Body>
    </Card>
  );
}
export default MaterialCard;
