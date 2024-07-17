import './MaterialCard.css';
import DownloadIcon from '@mui/icons-material/Download';
import MySpeedDial from './MySpeedDial';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { useTheme } from '@mui/material/styles';
import formatDate from '../../utils/dateFormatter';

function MaterialCardPreview({ studyMaterial }: { studyMaterial: StudyMaterial }) {
  const theme = useTheme();

  return (
    <>
      <Card className="Card" sx={{ borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
        <CardContent className="bodycard">
          <CardHeader
            sx={{
              display: 'flex',
              marginTop: '5px',
              textAlign: 'left'
            }}
            action={
              <MySpeedDial
                handleEditToggle={() => {}}
                handleMoveToggle={() => {}}
                handleSave={() => {}}
                handleDelete={() => {}}
                isEditing={false}
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
          <CardActions>
            <Button sx={{ display: 'flex', justifyItems: 'flex-end', alignItems: 'flex-end' }}>
              הורדה
              <DownloadIcon />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
export default MaterialCardPreview;
