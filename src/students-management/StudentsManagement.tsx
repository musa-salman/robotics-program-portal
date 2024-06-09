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
      { field: 'firstName', headerName: 'שם פרטי', flex: 1, editable: true },
      { field: 'lastName', headerName: 'שם משפחה', flex: 1, editable: true },
      { field: 'studentEmail', headerName: 'דוא"ל תלמיד', flex: 1, editable: true },
      { field: 'motherEmail', headerName: 'דוא"ל אם', flex: 1, editable: true },
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
                  const editedRow = rows!.find((row) => row.id === id);
                  if (!editedRow) return;

                  setRows((prevRows) => prevRows!.map((row) => (row.id === id ? { ...row, isNew: false } : row)));
                  setRowModesModel((prevRowModesModel) => ({
                    ...prevRowModesModel,
                    [id]: { mode: GridRowModes.View }
                  }));
                }}
              />,
              <GridActionsCellItem
                icon={<CancelIcon color="error" />}
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
              icon={<EditIcon color="secondary" />}
              label="ערוך"
              onClick={(_) => {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
              }}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon color="error" />}
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
