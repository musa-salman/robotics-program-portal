import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { Typography } from '@mui/material';
import { Register } from '../register/Register';
import { RegisterContext } from '../register/service/RegisterContext';
import StudentForm from '../students-management/StudentForm';
import { Close, Done } from '@mui/icons-material';

const RegisterManagement = () => {
  const registerService = useContext(RegisterContext);

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (Register & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(Register & { isNew: boolean })[] | null>>,
    setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<Register | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
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
        field: 'studentContact',
        type: 'custom',
        headerName: 'פרטי תלמיד',
        flex: 1,
        renderCell: ({ row }) => (
          <div className="multiline-cell">
            <Typography>{row.studentPhoneNumber}</Typography>
            <Typography>{row.studentEmail}</Typography>
          </div>
        )
      },
      {
        field: 'parentContact',
        type: 'custom',
        headerName: 'פרטי הורה',
        flex: 1,
        renderCell: ({ row }) => (
          <div className="multiline-cell">
            <Typography>{row.parentPhoneNumber}</Typography>
            <Typography>{row.parentEmail}</Typography>
          </div>
        )
      },
      {
        field: 'academicDetails',
        type: 'custom',
        headerName: 'פרטי לימודים',
        flex: 1,
        renderCell: ({ row }) => (
          <div className="multiline-cell">
            <Typography>{row.studentSchool}</Typography>
            <Typography>{row.studyUnitsMajor}</Typography>
            <Typography>{row.numStudyUnitsMath}</Typography>
          </div>
        )
      },
      {
        field: 'otherDetails',
        type: 'custom',
        headerName: 'פרטים נוספים',
        flex: 1,
        renderCell: ({ row }) => (
          <div className="multiline-cell">
            <Typography>{row.hearAboutUs}</Typography>
            <Typography>{row.otherQuestions}</Typography>
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
                  .then(() => setRows(rows!.filter((register) => register.id !== id)))
                  .catch((_) => {
                    setMessage('התרחשה שגיאה בדחיית הרישום');
                  });
              }}
            />,
            <GridActionsCellItem
              icon={<Done color="success" />}
              label="לאשר"
              onClick={(_) => {
                registerService
                  .approveRegister(rows!.find((register) => register.id === id)!)
                  .then(() => setRows(rows!.filter((register) => register.id !== id)))
                  .catch((_) => {
                    setMessage('התרחשה שגיאה באישור הרישום');
                  });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<Register> = {
    deleteError: () => 'התרחשה שגיאה בדחיית הרישום',
    deleteSuccess: () => 'הרישום נדחה בהצלחה',
    updateError: () => 'התרחשה שגיאה בעדכון הרישום',
    updateSuccess: () => 'הרישום עודכן בהצלחה'
  };

  return (
    <>
      <CollectionTable<Register>
        title="ניהול רישומים"
        generateColumns={generateColumns}
        repository={registerService.registerRepository}
        FormComponent={StudentForm}
        messageFormat={messageFormat}
      />
    </>
  );
};

export default RegisterManagement;
