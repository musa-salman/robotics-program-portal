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
import { useTheme } from '@mui/material/styles';
import FeedbackSnackbar, { FeedbackMessage } from '../../components/snackbar/SnackBar';
import EditModel from './EditModel';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const storageService = useContext(StorageServiceContext);
  const materialService = useMaterialService();

  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState(0);
  const [formData, setFormData] = useState<StudyMaterial>(studyMaterial);
  const [file, setFile] = useState<File | null>(null);

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, filename: e.target.value }));
    setFile(e.target.files?.[0] || null);
  };

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
    materialService.studyMaterialRepository
      .update(studyMaterial.id, formData)
      .then(() => {
        onUpdate(formData);
        handleEditToggle();
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
      {showDeleteModal && (
        <DeleteModal
          message="האם אתה בטוח שברצונך למחוק את החומר?"
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {isEditing && (
        <EditModel
          handleClose={handleEditToggle}
          handleSave={handleSave}
          handleInputChange={handleInput}
          handleFileChange={handleFileChange}
          studyMaterial={studyMaterial}
        />
      )}
      <Card className="Card" sx={{ borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
        <CardContent className="bodycard">
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
          <Divider component="div" variant="fullWidth" style={{ backgroundColor: '#F2542D' }} />
          <div>
            <Typography className="description">{studyMaterial.description}</Typography>
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
