import './MaterialCard.css';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { StudyMaterial } from '../repository/StudyMaterial';
import { useTheme } from '@mui/material/styles';
import formatDate from '../../utils/dateFormatter';

/**
 * Renders a preview card for a study material.
 *
 * @param studyMaterial - The study material object to display.
 */
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
            style={{ backgroundColor: 'black', height: '3px', marginBottom: '5px' }}
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
            <Button size="small" style={{ color: theme.palette.primary.main }}>
              קרא עוד
            </Button>
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
