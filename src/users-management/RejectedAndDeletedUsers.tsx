import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import { Chip } from '@mui/material';
import { useUserService } from '../users/UserContext';
import { User } from '../users/User';
import Role, { roleColorsLevel, roleNames } from '../authentication/components/Roles';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { FeedbackMessage } from '../components/snackbar/SnackBar';

const RejectedAndDeletedTable = () => {
  const userService = useUserService();

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (User & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(User & { isNew: boolean })[] | null>>,
    _setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    _setInitialItem: React.Dispatch<React.SetStateAction<User | null>>,
    _showMessage: (message: FeedbackMessage) => void
  ): GridColDef[] => {
    return [
      { field: 'email', type: 'string', headerName: 'אימייל', flex: 1 },
      {
        field: 'roles',
        type: 'custom',
        headerName: 'מחוק /הודחה',
        flex: 1,
        sortComparator: (v1, v2) => Math.min(...v1) - Math.min(...v2),
        renderCell: ({ row }) => (
          <>
            {row.roles.map((role: Role) => (
              <Chip key={role} label={roleNames[role]} color={roleColorsLevel[role]} />
            ))}
          </>
        )
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'פעולות',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<RestoreFromTrashIcon />}
              label="החזיר למערכת"
              onClick={(_) => {
                userService.deleteUser(id.toString()).then(() => {
                  setRows(rows!.filter((r) => r.id !== id.toString()));
                });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<User> = {
    deleteError: () => 'התרחשה שגיאה במחיקת המשתמש',
    deleteSuccess: () => 'המשתמש נמחק בהצלחה',
    deleteConfirmation: (item) => `האם אתה בטוח שברצונך למחוק את ${item.email}?`,
    updateError: () => '',
    updateSuccess: () => ''
  };

  return (
    <>
      <CollectionTable<User>
        generateColumns={generateColumns}
        getItems={() => {
          return userService
            .getUsers()
            .then((users) => users.filter((u) => u.roles.includes(Role.Rejected) || u.roles.includes(Role.deleted)));
        }}
        messageFormat={messageFormat}
      />
    </>
  );
};

export default RejectedAndDeletedTable;
