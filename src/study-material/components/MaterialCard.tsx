import './MaterialCard.css';
import { useContext, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { Button, Card, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { StorageServiceContext } from '../../storage-service/StorageContext';

import GPT from '../../gpt-service/GPTComponent';
import { suggestMaterialTitles } from './upload-file/StudyMaterialPrompts';
import formatDate from '../../utils/dateFormatter';
import { useMaterialService } from '../repository/StudyMaterialContext';
import DeleteModal from '../DeleteModal';
import { BiBorderRadius } from 'react-icons/bi';
import FeedbackSnackbar, { FeedbackMessage } from '../../components/snackbar/SnackBar';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

  const storageService = useContext(StorageServiceContext);
  const materialService = useMaterialService();

  // Define the feedback message
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | undefined>(undefined);

  const handleDownload = async () => {
    storageService.download(
      '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename,
      studyMaterial.filename
    );
  };

  const isDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    storageService
      .delete('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename)
      .then(() => {
        materialService.studyMaterialRepository.delete(studyMaterial.id).then(() => onDelete(studyMaterial));
        onDelete(studyMaterial);
        setFeedbackMessage({
          message: 'החומר נמחק בהצלחה',
          variant: 'success'
        });
      })
      .catch(() => {
        setFeedbackMessage({
          message: 'שגיאה במחיקת החומר',
          variant: 'error'
        });
      });
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
        setFeedbackMessage({
          message: 'החומר עודכן בהצלחה',
          variant: 'success'
        });
      })
      .catch(() => {
        setFeedbackMessage({
          message: 'שגיאה בעדכון החומר',
          variant: 'error'
        });
      });
  };

  const handleMoveToggle = () => {
    onMove(studyMaterial);
  };

  return (
    <>
      {feedbackMessage && <FeedbackSnackbar key={feedbackMessage.message} feedBackMessage={feedbackMessage} />}
      {showDeleteModal && <DeleteModal onDelete={handleDelete} onCancel={() => setShowDeleteModal(false)} />}
      <Card className="Card" sx={{ borderRadius: '15px' }}>
        <div>
          <MySpeedDial
            handleEditToggle={handleEditToggle}
            handleMoveToggle={handleMoveToggle}
            handleSave={handleSave}
            handleDelete={isDelete}
            isEditing={isEditing}
          />
          <br />
        </div>
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
          <Divider component="div" role="presentation" />
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
          <Typography className="date"> תאריך : {formatDate(studyMaterial.date)}</Typography>

          <Button onClick={handleDownload}>
            הורדה
            <DownloadIcon />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
export default MaterialCard;
