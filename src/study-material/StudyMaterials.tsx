import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudyMaterials.css';
import { useContext, useState } from 'react';
import { StudyMaterial } from './StudyMaterial';
import moment from 'moment';
import { StorageServiceContext } from '../storage-service/StorageContext';
import { StudyMaterialContext } from './repository/StudyMaterialContext';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { Alert, TextField } from '@mui/material';
import MoveList from './MoveList';
import { Category } from '@mui/icons-material';

type UpdateHandler = (updatedMaterial: StudyMaterial) => void;
type DeleteHandler = (studyMaterial: StudyMaterial) => void;
type MoveHandler = (updatedCategory: StudyMaterial, oldCategory: string) => void;

function StudyMaterials({
  studyMaterial,
  categories,
  onUpdate,
  onDelete,
  onMove
}: {
  studyMaterial: StudyMaterial;
  categories: string[];
  onUpdate: UpdateHandler;
  onDelete: DeleteHandler;
  onMove: MoveHandler;
}) {
  const storageService = useContext(StorageServiceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isMove, setIsMove] = useState(false);
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
    storageService.delete('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename).then(() => {
      studyMaterialRepository.deleteStudyMaterialFromCategory(studyMaterial.category.id, studyMaterial.id);
      onDelete(studyMaterial);
    });
    // TODO catch
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
    console.log(updatedStudyMaterial);
    studyMaterialRepository
      .updateStudyMaterialInCategory(studyMaterial.category.id, studyMaterial.id, updatedStudyMaterial)
      .then(() => {
        onUpdate(updatedStudyMaterial);
        console.log(updatedStudyMaterial);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating study material:', error);
      });
  };

  const handleMove = (selectCategory: string) => {
    const updatedCategory = {
      ...studyMaterial,
      category: {
        ...studyMaterial.category,
        category: selectCategory
      }
    };
    studyMaterialRepository
      .moveMaterialToCategory(studyMaterial, studyMaterial.category.category, selectCategory)
      .then(() => {
        onMove(updatedCategory, studyMaterial.category.category);
        setIsMove(false);
      })
      .catch((error) => {
        console.error('Error move study material:', error);
      });
  };

  const handleMoveToggle = async () => {
    setIsMove(!isMove);
  };

  const momentDate = moment(studyMaterial.date).format('DD / MM / YYYY');

  return (
    <Card className="Card">
      <MySpeedDial
        handleEditToggle={handleEditToggle}
        handleMoveToggle={handleMoveToggle}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleMove={handleMove}
        isEditing={isEditing}
      />
      <br />
      <Card.Body className="bodycard">
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            variant="outlined"
            fullWidth
          />
        ) : (
          <Card.Title className="title-card">{studyMaterial.title}</Card.Title>
        )}
        <hr className="custom-hr" />
        <div>
          {isEditing ? (
            <TextField
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          ) : (
            <Card.Text className="description">{studyMaterial.description}</Card.Text>
          )}
        </div>
        <p className="date"> תאריך : {momentDate} </p>
        <Button className="dow-button" onClick={handleDownload}>
          הורדה
          <DownloadIcon className="dow-icon" />
        </Button>
      </Card.Body>
      {isMove && <MoveList categories={categories} onMove={handleMove} />}
    </Card>
  );
}
export default StudyMaterials;
