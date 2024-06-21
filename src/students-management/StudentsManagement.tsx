import { GridRowModesModel, GridRowModes, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Student } from './Student';
import { StudentContext } from './StudentContext';
import { useContext } from 'react';
import AddStudentForm from './AddStudentForm';
import './StudentsManagement.css';
import { Typography } from '@mui/material';

const StudentsManagement = () => {
  const studentRepository = useContext(StudentContext);

  const generateColumns = (
    rows: (Student & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(Student & { isNew: boolean })[] | null>>,
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
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
        field: 'actions',
        type: 'actions',
        headerName: 'פעולות',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon color="primary" />}
                label="שמור"
                onClick={(_) => {
                  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                }}
              />,
              <GridActionsCellItem
                icon={<CancelIcon color="action" />}
                label="בטל"
                onClick={(_) => {
                  setRowModesModel((prevRowModesModel) => ({
                    ...prevRowModesModel,
                    [id]: { mode: GridRowModes.View, ignoreModifications: true }
                  }));

                  const editedRow = rows!.find((row) => row.id === id);
                  if (editedRow?.isNew) {
                    setRows((prevRows) => prevRows!.filter((row) => row.id !== id));
                  }
                }}
              />
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon color="action" />}
              label="ערוך"
              onClick={(_) => {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
              }}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon color="action" />}
              label="מחק"
              onClick={(_) => {
                studentRepository
                  .delete(id.toString())
                  .then(() => setRows(rows!.filter((student) => student.id !== id)))
                  .catch((_) => {
                    setMessage('התרחשה שגיאה במחיקת התלמיד');
                  });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<Student> = {
    addManySuccess: (count) => `נוספו ${count} תלמידים בהצלחה`,
    addManyError: (count) => `התרחשה שגיאה בהוספת ${count} תלמידים`,
    addSuccess: (student) => `התלמיד ${student.firstName} ${student.lastName} נוסף בהצלחה`,
    addError: (student) => `התרחשה שגיאה בהוספת התלמיד: ${student.firstName} ${student.lastName}`,
    deleteSuccess: () => 'התלמיד נמחק בהצלחה',
    deleteError: () => 'התרחשה שגיאה במחיקת התלמיד',
    updateSuccess: (item: Student) => `התלמיד ${item.firstName} ${item.lastName} עודכן בהצלחה`,
    updateError: (item: Student) => `התרחשה שגיאה בעדכון התלמיד: ${item.firstName} ${item.lastName}`
  };

  return (
    <CollectionTable<Student>
      title="ניהול תלמידים"
      generateColumns={generateColumns}
      repository={studentRepository}
      FormComponent={AddStudentForm}
      messageFormat={messageFormat}
    />
  );
};

export default StudentsManagement;
