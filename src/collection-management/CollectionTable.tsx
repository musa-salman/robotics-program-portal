import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowModel, GridRowModesModel } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { heIL } from '@mui/x-data-grid/locales';
import SimpleSnackbar from '../components/snackbar/SnackBar';
import handleImportCSV from '../utils/csvUtils';
import { BaseRepository } from '../repositories/BaseRepository';
import CustomToolbar from './CustomToolbar';

interface MessageFormat<T> {
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

  const addItem = async (newItem: T) => {
    repository
      .create(newItem)
      .then((item) => {
        const extendedItem = { ...newItem, id: item.id, isNew: true };
        setRows((prevRows) => [...(prevRows || []), extendedItem]);
        setMessage(messageFormat.addSuccess(newItem));
        setShowAddItemForm(false);
      })
      .catch((_) => {
        setMessage(messageFormat.addError(newItem));
      });
  };

  const editItem = async (item: T): Promise<void> => {
    try {
      await repository.update(item.id, item);
      setRows((prevRows) => prevRows!.map((row) => (row.id === item.id ? { ...row, isNew: false } : row)));
      setMessage(`Item ${item.id} updated successfully`);
    } catch {
      setMessage(`Error updating item: ${item.id}`);
    }
  };

  const handleRefresh = () => {
    setRows(null);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as T & { isNew: boolean };

    editItem(updatedRow);
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const addItems = async (items: T[]) => {
    try {
      const createdItems = await repository.createMany(items);
      const newItems = createdItems.map((item, index) => ({ ...items[index], id: item.id, isNew: true }));
      setRows((prevRows) => [...(prevRows || []), ...newItems]);
      setMessage(messageFormat.addSuccess(items[0]));
    } catch {
      setMessage(messageFormat.addError(items[0]));
    }
  };

  return (
    <>
      <Dialog
        open={showAddItemForm}
        onClose={() => setShowAddItemForm(false)}
        fullWidth
        maxWidth="sm"
        className="dialog-container">
        <DialogTitle>Add Item</DialogTitle>
        <div>
          <FormComponent onAddItem={addItem} />
        </div>
        <DialogActions>
          <Button onClick={() => setShowAddItemForm(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box className="table-container">
        <Typography variant="h4" component="h2" gutterBottom className="table-title">
          {title}
        </Typography>
        <DataGrid
          rows={rows || []}
          columns={generateColumns(rows, setRows, rowModesModel, setRowModesModel, setMessage)}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection
          editMode="row"
          slots={{
            toolbar: CustomToolbar
          }}
          slotProps={{
            toolbar: {
              onAddItemClick: () => setShowAddItemForm(true),
              onAddItemCSV: () => handleImportCSV(addItems),
              onRefresh: handleRefresh,
              showQuickFilter: true
            }
          }}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          className="data-grid"
          sx={{
            '& .actions': {
              display: 'flex',
              justifyContent: 'center'
            },
            m: 2,
            p: 2
          }}
        />
      </Box>
      {message && <SimpleSnackbar message={message} />}
    </>
  );
};

export type { CollectionTableProps, MessageFormat, Actions };
export default CollectionTable;
