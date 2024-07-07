import React, { useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModesModel,
  GridValidRowModel,
  GridRowSelectionModel
} from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { heIL } from '@mui/x-data-grid/locales';
import SimpleSnackbar from '../components/snackbar/SnackBar';
import { BaseRepository } from '../repositories/BaseRepository';
import CustomToolbar from './CustomToolbar';
import { CachingRepository } from '../repositories/caching/CachingRepository';
import './CollectionTable.css';

interface MessageFormat<T> {
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
    setShowAddItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<T | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
  ) => GridColDef[];
  repository?: BaseRepository<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FormComponent?: React.FC<any>;
  getItems?: () => Promise<T[]>;
  messageFormat: MessageFormat<T>;
  onRowSelected?: (row: GridRowModel) => void;
}

const CollectionTable = <T extends { id: string }>({
  title,
  generateColumns,
  repository,
  FormComponent,
  getItems,
  messageFormat,
  onRowSelected
}: CollectionTableProps<T>) => {
  const [rows, setRows] = useState<(T & { isNew: boolean })[] | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [message, setMessage] = useState<string | null>(null);
  const [showAddItemForm, setShowItemForm] = useState(false);
  const [initialItem, setInitialItem] = useState<T | null>(null);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

  useEffect(() => {
    function fetchItems() {
      (getItems !== undefined ? getItems() : repository!.find()).then((items) =>
        setRows(items.map((item: T) => ({ ...item, isNew: false })))
      );
    }

    if (!rows) fetchItems();
  }, [rows, repository]);

  const handleRowSelection = useCallback(
    (selection: GridRowSelectionModel) => {
      const selectedId = selection[0];
      const selected = rows?.find((register) => register.id === selectedId) || null;
      // remove newRow field from selection
      const { isNew, ...selectedRow } = selected as any;
      onRowSelected!(selectedRow);
    },
    [rows]
  );

  const updateItem = (updatedItem: T) => {
    const id = updatedItem.id;
    repository!
      .update(updatedItem.id, updatedItem)
      .then(() => {
        const extendedItem = { ...updatedItem, id: id, isNew: false };
        const updatedRows = rows!.map((row) => (row.id === id ? extendedItem : row));
        setRows(updatedRows);
        setMessage(messageFormat.updateSuccess(updatedItem));
        setShowItemForm(false);
      })
      .catch(() => {
        setMessage(messageFormat.updateError(updatedItem));
      });
  };

  const handleRefresh = () => {
    (repository as CachingRepository<T>).invalidateCache();
    setRows(null);
  };

  const processRowUpdate = (newRow: GridRowModel): GridValidRowModel => {
    const { _, ...updatedRow } = newRow as any;

    repository!
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

  const columns = generateColumns(rows, setRows, setShowItemForm, setInitialItem, setMessage);

  return (
    <>
      <Dialog
        open={showAddItemForm}
        onClose={() => setShowItemForm(false)}
        fullWidth
        maxWidth="sm"
        className="dialog-container">
        <DialogTitle>עריכת פריט</DialogTitle>
        {FormComponent && initialItem && <FormComponent saveItem={updateItem} initialItem={initialItem} />}
        <DialogActions>
          <Button onClick={() => setShowItemForm(false)} color="secondary">
            בטל
          </Button>
        </DialogActions>
      </Dialog>
      <Box className="table-container">
        <Typography variant="h4" component="h2" gutterBottom className="table-title">
          {title}
        </Typography>
        <div className="data-grid-container">
          <DataGrid
            rows={rows || []}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50]}
            checkboxSelection
            editMode="row"
            initialState={{
              density: 'comfortable'
            }}
            slots={{
              toolbar: CustomToolbar
            }}
            slotProps={{
              toolbar: {
                onRefreshClick: handleRefresh,
                showQuickFilter: true
              }
            }}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            onRowSelectionModelChange={onRowSelected}
            selectionModel={selectionModel}
            onProcessRowUpdateError={(error) => console.error(error)}
            localeText={{
              ...heIL.components.MuiDataGrid.defaultProps.localeText,
              noRowsLabel: 'אין רשומות להצגה',
              columnsManagementReset: 'איפוס',
              columnsManagementSearchTitle: 'חיפוש',
              columnsManagementShowHideAllText: 'הצג/הסתר הכל'
            }}
            className="data-grid"
          />
        </div>
      </Box>
      {message && <SimpleSnackbar message={message} />}
    </>
  );
};

export type { CollectionTableProps, MessageFormat, Actions };
export default CollectionTable;
