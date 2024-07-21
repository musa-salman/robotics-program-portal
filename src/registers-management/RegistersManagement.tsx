import { GridActionsCellItem, GridColDef, GridRowModel } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useContext, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Register } from '../register/Register';
import { RegisterContext } from '../register/service/RegisterContext';
import StudentForm from '../students-management/StudentForm';
import { Close, Done } from '@mui/icons-material';
import StudentDetails from './RegisterDetails';
import { FeedbackMessage } from '../components/snackbar/SnackBar';
import BannerButton from '../components/BannerButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const RegisterManagement = () => {
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null);
  const registerService = useContext(RegisterContext);

  const handleDelete = (register: Register) => {
    return registerService.rejectRegister(register.id);
  };

  const generateColumns = (
    rows: (Register & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(Register & { isNew: boolean })[] | null>>,
    setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<Register | null>>,
    showMessage: (message: FeedbackMessage) => void,
    onRowDeleted: (row: GridRowModel) => void
  ): GridColDef[] => {
    return [
      {
        field: 'studentName',
        type: 'string',
        headerName: 'שם תלמיד',
        flex: 1,
        renderCell: ({ row }) => (
          <Typography>
            {row.firstName} {row.lastName}
          </Typography>
        ),
        valueGetter: (_, row) => `${row.firstName} ${row.lastName}`
      },
      { field: 'studentId', type: 'string', headerName: 'תעודת זהות', flex: 1 },
      { field: 'studentPhoneNumber', type: 'string', headerName: 'טלפון תלמיד', flex: 1 },
      { field: 'parentPhoneNumber', type: 'string', headerName: 'טלפון הורה', flex: 1 },
      { field: 'studentEmail', type: 'string', headerName: 'אימייל תלמיד', flex: 1 },
      { field: 'parentEmail', type: 'string', headerName: 'אימייל הורה', flex: 1 },
      { field: 'studentAddress', type: 'string', headerName: 'כתובת', flex: 1 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'פעולות',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon color="action" />}
              label="ערוך"
              onClick={(_) => {
                setInitialItem(rows!.find((register) => register.id === id) || null);
                setShowItemForm(true);
              }}
            />,
            <GridActionsCellItem
              icon={<Close color="error" />}
              label="לדחות"
              onClick={(_) => {
                onRowDeleted(rows!.find((register) => register.id === id)!);
              }}
            />,
            <GridActionsCellItem
              icon={<Done color="success" />}
              label="לאשר"
              onClick={(_) => {
                registerService
                  .approveRegister(rows!.find((register) => register.id === id)!)
                  .then(() => {
                    setRows(rows!.filter((register) => register.id !== id));
                    showMessage({ message: 'המועמד אושר בהצלחה', variant: 'success' });
                  })
                  .catch((_) => {
                    showMessage({ message: 'התרחשה שגיאה באישור המועמד', variant: 'error' });
                  });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<Register> = {
    deleteError: () => 'התרחשה שגיאה במחיקת המועמד',
    deleteSuccess: () => 'המועמד נמחק בהצלחה',
    deleteConfirmation: (item) => `האם אתה בטוח שברצונך למחוק את המועמד ${item.firstName} ${item.lastName}?`,
    updateError: () => 'התרחשה שגיאה בעדכון המועמד',
    updateSuccess: () => 'המועמד עודכן בהצלחה'
  };

  const handleRowSelected = useCallback((row: GridRowModel | null) => {
    setSelectedRegister(row as Register);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={selectedRegister ? 8 : 12}>
          <CollectionTable<Register>
            generateColumns={generateColumns}
            repository={registerService.registerRepository}
            FormComponent={StudentForm}
            messageFormat={messageFormat}
            onRowSelected={handleRowSelected}
            onDelete={handleDelete}
            columnVisibilityModel={{
              parentPhoneNumber: false,
              parentEmail: false,
              studentSchool: false
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {selectedRegister && (
            <StudentDetails registrationData={selectedRegister} onClose={() => setSelectedRegister(null)} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterManagement;
