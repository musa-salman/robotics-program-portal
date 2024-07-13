import './MaterialCard.css';
import { useContext, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { StorageServiceContext } from '../../storage-service/StorageContext';

import GPT from '../../gpt-service/GPTComponent';
import { suggestMaterialTitles } from './upload-file/StudyMaterialPrompts';
import formatDate from '../../utils/dateFormatter';
import { useMaterialService } from '../repository/StudyMaterialContext';
import DeleteModal from '../DeleteModal';
import { BiBorderRadius } from 'react-icons/bi';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(studyMaterial.title);
  const [editedDescription, setEditedDescription] = useState(studyMaterial.description);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

  const storageService = useContext(StorageServiceContext);
  const materialService = useMaterialService();

  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState(0);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleDownload = async () => {
    storageService
      .download('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename, studyMaterial.filename)
      .catch(() => {
        showMessage({
          message: 'שגיאה בהורדת החומר',
          variant: 'error'
        });
      });
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
        showMessage({
          message: 'החומר נמחק בהצלחה',
          variant: 'success'
        });
      })
      .catch(() => {
        showMessage({
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
        showMessage({
          message: 'החומר עודכן בהצלחה',
          variant: 'success'
        });
      })
      .catch(() => {
        showMessage({
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
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      {showDeleteModal && <DeleteModal onDelete={handleDelete} onCancel={() => setShowDeleteModal(false)} message={"האם אתה בטוח שברצונך למחוק את הפיל הזה"}/>}
      <Card className="Card" sx={{ borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
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
            <CardHeader
              sx={{
                display: 'flex',
                marginTop: '5px',
                flexDirection: 'row-reverse'
              }}
              action={
                <MySpeedDial
                  handleEditToggle={handleEditToggle}
                  handleMoveToggle={handleMoveToggle}
                  handleSave={handleSave}
                  handleDelete={isDelete}
                  isEditing={isEditing}
                />
              }
              title={studyMaterial.title}
              className="title-card"
            />
          )}
          <Divider component="div" variant="fullWidth" style={{ backgroundColor: '#F2542D' }} />
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
