import './MaterialCard.css';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { useTheme } from '@mui/material/styles';
import formatDate from '../../utils/dateFormatter';

function MaterialCardPreview({ studyMaterial }: { studyMaterial: StudyMaterial }) {
  const theme = useTheme();

  return (
    <>
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
            className="title-card"
            title={
              <Typography variant="h5" component="div" style={{ color: theme.palette.primary.main }}>
                {studyMaterial.title}
              </Typography>
            }
          />
          <Divider
            component="div"
            variant="fullWidth"
            style={{ backgroundColor: 'black', height: '3px', marginBottom: '5px' }}
          />
          <div>
            <Typography
              variant="body1"
              // className="description"
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
            <Button sx={{ width: '10rem', fontSize: '20px' }}>
              הורדה
              <DownloadIcon sx={{ margin: '10px' }} />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
export default MaterialCardPreview;
