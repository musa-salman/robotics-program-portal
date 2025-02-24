import { SpeedDial, SpeedDialAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './MySpeedDial.css';
import { MouseEventHandler, useState } from 'react';

/**
 * Props for the MySpeedDial component.
 */
interface MySpeedDialProps {
  handleEditToggle: MouseEventHandler<HTMLDivElement> | undefined;
  handleMoveToggle: MouseEventHandler<HTMLDivElement> | undefined;
  handleSave: () => void;
  handleDelete: MouseEventHandler<HTMLDivElement> | undefined;
  // handleMove: (selectCategory: string) => void;
  isEditing: boolean;
}

/**
 * Renders a speed dial component with customizable actions.
 *
 * @param handleEditToggle - The function to handle the edit action.
 * @param handleMoveToggle - The function to handle the move action.
 * @param handleDelete - The function to handle the delete action.
 */
function MySpeedDial({ handleEditToggle, handleMoveToggle, handleDelete }: MySpeedDialProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const actions = [
    { icon: <EditIcon />, name: 'לַעֲרוֹך', action: handleEditToggle, className: '' },
    { icon: <DeleteIcon />, name: 'לִמְחוֹק', action: handleDelete, className: 'delete-action' },
    { icon: <DriveFileMoveIcon />, name: 'לעבור', action: handleMoveToggle, className: '' }
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      className="speedDial"
      icon={<MoreVertIcon sx={{ color: 'white', fontSize: '2rem' }} />}
      direction="down"
      open={open}
      onClick={handleOpen}>
      {actions.map((action) => (
        <SpeedDialAction
          // className="speedDialAction"
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={(e) => {
            action.action!(e);
            handleOpen();
          }}
          className={action.className}
        />
      ))}
    </SpeedDial>
  );
}

export default MySpeedDial;
