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

const RegisterManagement = () => {
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null);
  const registerService = useContext(RegisterContext);

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (Register & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(Register & { isNew: boolean })[] | null>>,
    setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<Register | null>>,
    setMessage: React.Dispatch<React.SetStateAction<FeedbackMessage | undefined>>
  ): GridColDef[] => {
    return [
      { field: 'studentId', type: 'string', headerName: 'תעודת זהות', flex: 1, editable: true },
      { field: 'studentAddress', type: 'string', headerName: 'כתובת', flex: 1, editable: true },
      {
        field: 'studentName',
        type: 'string',
        headerName: 'שם תלמיד',
        flex: 1,
        renderCell: ({ row }) => (
          <div>
            <Typography>
              {row.firstName} {row.lastName}
            </Typography>
          </div>
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
                registerService
                  .rejectRegister(id.toString())
                  .then(() => {
                    setRows(rows!.filter((register) => register.id !== id));
                    setMessage({ message: 'המועמד נדחה בהצלחה', variant: 'success' });
                  })
                  .catch((_) => {
                    setMessage({ message: 'התרחשה שגיאה בדחיית המועמד', variant: 'error' });
                  });
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
                    setMessage({ message: 'המועמד אושר בהצלחה', variant: 'success' });
                  })
                  .catch((_) => {
                    setMessage({ message: 'התרחשה שגיאה באישור המועמד', variant: 'error' });
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
    updateError: () => 'התרחשה שגיאה בעדכון המועמד',
    updateSuccess: () => 'המועמד עודכן בהצלחה'
  };

  const handleRowSelected = useCallback((row: GridRowModel | null) => {
    setSelectedRegister(row as Register);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={selectedRegister ? 8 : 12}>
        <CollectionTable<Register>
          generateColumns={generateColumns}
          repository={registerService.registerRepository}
          FormComponent={StudentForm}
          messageFormat={messageFormat}
          onRowSelected={handleRowSelected}
        />
      </Grid>
      <Grid item xs={4}>
        {selectedRegister && (
          <StudentDetails registrationData={selectedRegister} onClose={() => setSelectedRegister(null)} />
        )}
      </Grid>
    </Grid>
  );
};

export default RegisterManagement;
