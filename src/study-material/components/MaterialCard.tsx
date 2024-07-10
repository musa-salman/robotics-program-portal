import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MaterialCard.css';
import { useContext, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { CardActions, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { StorageServiceContext } from '../../storage-service/StorageContext';
import SimpleSnackbar from '../../components/snackbar/SnackBar';
import GPT from '../../gpt-service/GPTComponent';
import { suggestMaterialTitles } from './upload-file/StudyMaterialPrompts';
import formatDate from '../../utils/dateFormatter';
import { useMaterialService } from '../repository/StudyMaterialContext';
import Success from '../Success';

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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarShow, setsnackbarShow] = useState(false);

  const storageService = useContext(StorageServiceContext);
  const materialService = useMaterialService();

  const handleDownload = async () => {
    storageService.download(
      '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename,
      studyMaterial.filename
    );
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
        setSnackbarMessage('The changes have been saved.');
        setsnackbarShow(true);
      })
      .catch((error) => {
        console.error('Error updating study material:', error);
      });
  };

  const handleMoveToggle = () => {
    onMove(studyMaterial);
  };

  return (
    <>
      <br></br>
      <Card className="Card">
        <MySpeedDial
          handleEditToggle={handleEditToggle}
          handleMoveToggle={handleMoveToggle}
          handleSave={handleSave}
          handleDelete={handleDelete}
          isEditing={isEditing}
        />
        <br />
        <CardContent className="bodycard">
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
            <CardHeader title={studyMaterial.title} className="title-card" />
          )}
          <Divider className="custom-hr" />
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
              <Typography className="description">{studyMaterial.description}</Typography>
            )}
          </div>
          <p className="date"> תאריך : {formatDate(studyMaterial.date)}</p>
          <Button className="dow-button" onClick={handleDownload}>
            הורדה
            <DownloadIcon className="dow-icon" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
export default MaterialCard;
