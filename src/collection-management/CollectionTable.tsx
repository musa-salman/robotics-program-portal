import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowModel, GridRowModesModel, GridValidRowModel } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { heIL } from '@mui/x-data-grid/locales';
import SimpleSnackbar from '../components/snackbar/SnackBar';
import handleImportCSV from '../utils/csvUtils';
import { BaseRepository } from '../repositories/BaseRepository';
import CustomToolbar from './CustomToolbar';

interface MessageFormat<T> {
  addManySuccess: (count: number) => string;
  addManyError: (count: number) => string;
  addSuccess: (item: T) => string;
  addError: (item: T) => string;
  deleteSuccess: () => string;
  deleteError: () => string;
  updateSuccess: (item: T) => string;
  updateError: (item: T) => string;
}

interface Actions {
  handleEditClick: (id: GridRowId) => () => void;
  handleSaveClick: (id: GridRowId) => () => void;
  handleCancelClick: (id: GridRowId) => () => void;
  deleteItem: (id: GridRowId) => void;
}

interface CollectionTableProps<T> {
  title: string;
  generateColumns: (
    rows: (T & { isNew: boolean })[] | null,
    setRows: React.Dispatch<
      React.SetStateAction<
        | (T & {
            isNew: boolean;
          })[]
        | null
      >
    >,
    rowModesModel: GridRowModesModel,
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
  ) => GridColDef[];
  repository: BaseRepository<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FormComponent: React.FC<any>;
  messageFormat: MessageFormat<T>;
}

const CollectionTable = <T extends { id: string }>({
  title,
  generateColumns,
  repository,
  FormComponent,
  messageFormat
}: CollectionTableProps<T>) => {
  const [rows, setRows] = useState<(T & { isNew: boolean })[] | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [message, setMessage] = useState<string | null>(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const items = await repository.find();
      setRows(items.map((item: T) => ({ ...item, isNew: false })));
    }

    if (!rows) fetchItems();
  }, [rows, repository]);

  const addItems = async (items: T[]) => {
    repository
      .createMany(items)
      .then((createdItems) => {
        const newItems = createdItems.map((item, index) => ({ ...items[index], id: item.id, isNew: false }));
        setRows((prevRows) => [...(prevRows || []), ...newItems]);
        setMessage(messageFormat.addManySuccess(newItems.length));
      })
      .catch(() => {
        setMessage(messageFormat.addError(items[0]));
      });
  };

  const addItem = async (newItem: T) => {
    repository
      .create(newItem)
      .then((item) => {
        const extendedItem = { ...newItem, id: item.id, isNew: false };
        setRows((prevRows) => [...(prevRows || []), extendedItem]);
        setMessage(messageFormat.addSuccess(newItem));
        setShowAddItemForm(false);
      })
      .catch(() => {
        setMessage(messageFormat.addError(newItem));
      });
  };

  const handleRefresh = () => {
    setRows(null);
  };

  const processRowUpdate = (newRow: GridRowModel): GridValidRowModel => {
    const { _, ...updatedRow } = newRow as any;

    repository
      .update(updatedRow.id, updatedRow as T)
      .then(() => {
        setMessage(messageFormat.updateSuccess(updatedRow));
      })
      .catch(() => {
        setMessage(messageFormat.updateError(updatedRow));
      });

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = generateColumns(rows, setRows, rowModesModel, setRowModesModel, setMessage);
  const columnsIds = columns.filter((column) => column.field !== 'actions').map((column) => column.field);

  return (
    <>
      <Dialog
        open={showAddItemForm}
        onClose={() => setShowAddItemForm(false)}
        fullWidth
        maxWidth="sm"
        className="dialog-container">
        <DialogTitle>הוספה</DialogTitle>
        <div>
          <FormComponent onAddItem={addItem} />
        </div>
        <DialogActions>
          <Button onClick={() => setShowAddItemForm(false)} color="secondary">
            בטל
          </Button>
        </DialogActions>
      </Dialog>
      <Box className="table-container">
        <Typography variant="h4" component="h2" gutterBottom className="table-title">
          {title}
        </Typography>
        <DataGrid
          rows={rows || []}
          columns={columns}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection
          editMode="row"
          slots={{
            toolbar: CustomToolbar
          }}
          slotProps={{
            toolbar: {
              onAddClick: () => setShowAddItemForm(true),
              onCSVImportClick: () => handleImportCSV(addItems, columnsIds),
              onRefreshClick: handleRefresh,
              showQuickFilter: true
            }
          }}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => console.error(error)}
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          className="data-grid"
          sx={{
            '& .actions': {
              display: 'flex',
              justifyContent: 'center'
            },
            '& .MuiDataGrid-overlayWrapper': {
              height: 500
            },
            '& .MuiDataGrid-columnsContainer': {
              backgroundColor: '#f5f5f5'
            },
            '& .MuiTablePagination-root': {
              direction: 'rtl',
              width: '100%'
            },
            m: 10,
            p: 1
          }}
        />
      </Box>
      {message && <SimpleSnackbar message={message} />}
    </>
  );
};

export type { CollectionTableProps, MessageFormat, Actions };
export default CollectionTable;
