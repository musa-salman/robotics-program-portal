import React, { useState } from 'react';
import './EventCard.css';
import EditDeleteEvent from './EditDeleteEvent';
import RegisterStudentToEvent from './RegisterStudentToEvent';
import ShowRegisteredStudents from './ShowRegisteredStudents';
import Role from '../authentication/components/Roles';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import { formatDateTimeRange } from '../utils/dateFormatter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Button, CircularProgress, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Represents the properties for an event.
 *
 * @remarks
 * This interface defines the properties required to render an event card.
 *
 * @public
 */
export interface EventProps {
  startDate: Date;
  endDate: Date;
  title: string;
  details: string;
  image: string;
  onEventDelete: (id: string) => void;
  onEventEdit: (event: EventProps) => void;
  id: string;
  animating?: boolean; // New prop for animation state
}

/**
 * EventCard component displays information about an event.
 *
 * @component
 * @example
 * ```tsx
 * <EventCard
 *   startDate={new Date()}
 *   endDate={new Date()}
 *   title="Event Title"
 *   details="Event details"
 *   image="event-image.jpg"
 *   onEventDelete={handleEventDelete}
 *   onEventEdit={handleEventEdit}
 *   id={1}
 *   animating={false}
 * />
 * ```
 */
const EventCard: React.FC<EventProps> = ({
  startDate,
  endDate,
  title,
  details,
  image,
  onEventDelete,
  onEventEdit,
  id,
  animating
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const theme = useTheme();

  return (
    <div className={`event-card ${animating ? 'zoom-out' : 'zoom-in'}`}>
      <Card
        className="cardIconButton"
        sx={{
          maxWidth: 480,
          minWidth: 480,
          background: theme.palette.background.paper,
          boxShadow: `0 4px 8px ${theme.palette.primary.main}`
        }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <RoleBasedAccessControl
                allowedRoles={[Role.Admin, Role.Owner]}
                unauthorizedAuthenticatedComponent={<></>}>
                <EditDeleteEvent
                  event={{ startDate, endDate, title, details, image, onEventDelete, onEventEdit, id }}
                  editEvent={onEventEdit}
                  deleteEvent={onEventDelete}
                />
              </RoleBasedAccessControl>
            </IconButton>
          }
          title={
            <Typography
              variant="h4"
              component="div"
              style={{
                minHeight: '32px',
                maxWidth: '320px',
                color: theme.palette.primary.main,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}>
              {title}
            </Typography>
          }
          subheader={
            <Typography variant="body2" component="div" style={{ minHeight: '64px' }}>
              {formatDateTimeRange(startDate, endDate)}
            </Typography>
          }
        />
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress />
          </div>
        )}
        <img
          style={{ display: isLoading ? 'none' : 'block', height: '150px', width: '100%', objectFit: 'cover' }}
          src={image}
          alt={title}
          onLoad={() => setIsLoading(false)}
        />{' '}
        <CardContent>
          <Typography
            variant="h6"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              maxHeight: '4.5em',
              minHeight: '4.5em',
              overflowWrap: 'break-word'
            }}>
            {details}
          </Typography>
          <Button size="small" onClick={handleOpenModal}>
            קרא עוד
          </Button>
        </CardContent>
        <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <RoleBasedAccessControl allowedRoles={[Role.Student]} unauthorizedAuthenticatedComponent={<></>}>
            <RegisterStudentToEvent eventId={id} eventDate={endDate} />
          </RoleBasedAccessControl>
          <IconButton aria-label="show-registered-students">
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
              <ShowRegisteredStudents eventId={id} />
            </RoleBasedAccessControl>
          </IconButton>
        </CardActions>
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
            {title}
          </Typography>
          <Typography variant="h6" component="div" style={{ marginBottom: '16px' }}>
            {details}
          </Typography>
          <Button onClick={handleCloseModal} style={{ marginTop: '16px' }}>
            סגור
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EventCard;
