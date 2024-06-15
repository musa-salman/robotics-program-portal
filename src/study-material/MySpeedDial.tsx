import { SpeedDial, SpeedDialAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './MySpeedDial.css';
import { MouseEventHandler } from 'react';

interface MySpeedDialProps {
  handleEditToggle: MouseEventHandler<HTMLDivElement> | undefined;
  handleMoveToggle: MouseEventHandler<HTMLDivElement> | undefined;
  handleSave: () => void;
  handleDelete: () => void;
  handleMove: (selectCategory: string) => void;
  isEditing: boolean;
}

function MySpeedDial({
  handleEditToggle,
  handleMoveToggle,
  handleSave,
  handleDelete,
  handleMove,
  isEditing
}: MySpeedDialProps) {
  let actions = [];

  if (!isEditing) {
    actions = [
      { icon: <EditIcon />, name: 'Edit', action: handleEditToggle, className: '' },
      { icon: <DeleteIcon />, name: 'Delete', action: handleDelete, className: 'delete-action' },
      { icon: <DriveFileMoveIcon />, name: 'Move', action: handleMoveToggle, className: '' }
    ];
  } else {
    actions = [
      { icon: <SaveIcon />, name: 'Save', action: handleSave, className: '' },
      { icon: <CancelIcon />, name: 'Cancel', action: handleEditToggle, className: '' }
    ];
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      className="speedDial"
      icon={<MoreVertIcon sx={{ color: 'white', fontSize: '2rem' }} />}
      direction="down">
      {actions.map((action) => (
        <SpeedDialAction
          // className="speedDialAction"
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
          className={action.className}
        />
      ))}
    </SpeedDial>
  );
}

export default MySpeedDial;
