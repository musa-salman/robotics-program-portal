import './MaterialCard.css';
import { useContext, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { StorageServiceContext } from '../../storage-service/StorageContext';
import formatDate from '../../utils/dateFormatter';
import { useMaterialService } from '../repository/StudyMaterialContext';
import DeleteModal from '../DeleteModal';
import { useTheme } from '@mui/material/styles';
import FeedbackSnackbar, { FeedbackMessage } from '../../components/snackbar/SnackBar';
import EditModel from './EditModel';
import customColor from '../../utils/customTheme';

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
    const filename = e.target.files?.[0]?.name || '';
    setFormData((prevState) => ({ ...prevState, filename }));
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

  const handleDelete = () => {
    storageService
      .delete('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename)
      .then(() => {
        materialService.studyMaterialRepository.delete(studyMaterial.id).then(() => {
          onDelete(studyMaterial);
          showMessage({
            message: 'החומר נמחק בהצלחה',
            variant: 'success'
          });
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
        formData.id = studyMaterial.id;
        if (file !== null) {
          storageService
            .upload(file, '/study-material/' + formData.id + '-' + formData.filename)
            .then(() => {
              showMessage({
                message: 'הקובץ הועלה בהצלחה',
                variant: 'success'
              });
              alert('החומר עודכן בהצלחה');
            })
            .catch(() => {
              showMessage({
                message: 'שגיאה בהעלאת הקובץ',
                variant: 'error'
              });
            });
        }
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
      <Card
        className="Card"
        sx={{
          borderRadius: '15px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 4px 8px ${theme.palette.primary.main}`
        }}>
        <CardContent className="bodycard">
          <CardHeader
            sx={{
              display: 'flex',
              marginTop: '5px',
              textAlign: 'left'
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
            <Typography
              variant="body2"
              className="description"
              style={{
                minHeight: '100px',
                maxHeight: '100px',
                wordWrap: 'break-word' // Ensures long words will be broken and wrapped to the next line
              }}>
              {studyMaterial.description}
            </Typography>
          </div>
          <Typography className="date"> {formatDate(studyMaterial.date)}</Typography>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ width: '10rem', fontSize: '20px' }} onClick={handleDownload}>
              הורדה
              <DownloadIcon sx={{ margin: '10px' }} />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
export default MaterialCard;
