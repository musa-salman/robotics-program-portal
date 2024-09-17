import './MaterialCard.css';
import { useContext, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Modal, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { StorageServiceContext } from '../../storage-service/StorageContext';
import formatDate from '../../utils/dateFormatter';
import { useMaterialService } from '../repository/StudyMaterialContext';
import DeleteModal from '../DeleteModal';
import { useTheme } from '@mui/material/styles';
import FeedbackSnackbar, { FeedbackMessage } from '../../components/snackbar/SnackBar';
import EditModel from './EditModel';
import RoleBasedAccessControl from '../../authentication/components/RoleBasedAccessControl';
import Role from '../../authentication/components/Roles';

type UpdateHandler = (updatedMaterial: StudyMaterial) => void;
type DeleteHandler = (studyMaterial: StudyMaterial) => void;
type MoveHandler = (studyMaterial: StudyMaterial) => void;

/**
 * Represents a MaterialCard component.
 *
 * @component
 * @example
 * ```tsx
 * <MaterialCard
 *   studyMaterial={studyMaterial}
 *   onUpdate={handleUpdate}
 *   onDelete={handleDelete}
 *   onMove={handleMove}
 * />
 * ```
 */
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
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const storageService = useContext(StorageServiceContext);
  const materialService = useMaterialService();

  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState(0);
  const [formData, setFormData] = useState<StudyMaterial>(studyMaterial);
  const [file, setFile] = useState<File | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    materialService.studyMaterialRepository
      .delete(studyMaterial.id)
      .then(async () => {
        const isExists = await storageService.exists(
          '/study-material/' + studyMaterial.id + '-' + studyMaterial.filename
        );
        if (isExists) {
          storageService
            .delete('/study-material/' + studyMaterial.id + '-' + studyMaterial.filename)
            .then(() => {
              onDelete(studyMaterial);
              showMessage({
                message: 'החומר נמחק בהצלחה',
                variant: 'success'
              });
              setShowDeleteModal(false);
            })
            .catch(() => {
              showMessage({
                message: 'שגיאה במחיקת החומר',
                variant: 'error'
              });
            });
          return;
        }
        onDelete(studyMaterial);
        showMessage({
          message: 'החומר נמחק בהצלחה',
          variant: 'success'
        });
        setShowDeleteModal(false);
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
          background: theme.palette.background.paper,
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
              <RoleBasedAccessControl
                allowedRoles={[Role.Admin, Role.Owner]}
                unauthorizedAuthenticatedComponent={<></>}>
                <MySpeedDial
                  handleEditToggle={handleEditToggle}
                  handleMoveToggle={handleMoveToggle}
                  handleSave={handleSave}
                  handleDelete={isDelete}
                  isEditing={isEditing}
                />
              </RoleBasedAccessControl>
            }
            className="title-card"
            title={
              <Typography
                variant="h5"
                component="div"
                style={{
                  minHeight: '32px',
                  maxWidth: '320px',
                  color: theme.palette.primary.main,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>
                {studyMaterial.title}
              </Typography>
            }
          />
          <Divider
            component="div"
            variant="fullWidth"
            style={{ backgroundColor: 'black', height: '3px', marginBottom: '2%' }}
          />
          <div>
            <Typography
              variant="body1"
              // className="description"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                maxHeight: '4.5em',
                minHeight: '4.5em',
                overflowWrap: 'break-word'
              }}>
              {studyMaterial.description}
            </Typography>
            <Button size="small" onClick={handleOpenModal} style={{ color: theme.palette.primary.main }}>
              קרא עוד
            </Button>
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '95%',
            height: '45%',
            maxHeight: '95%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}>
          <Typography
            variant="h4"
            component="div"
            style={{
              marginBottom: '16px',
              color: theme.palette.primary.main
            }}>
            {studyMaterial.title}
          </Typography>
          <Typography variant="h6" component="div" style={{ marginBottom: '16px' }}>
            {studyMaterial.description}
          </Typography>
          <Button onClick={handleCloseModal} style={{ marginTop: '16px' }}>
            סגור
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default MaterialCard;
