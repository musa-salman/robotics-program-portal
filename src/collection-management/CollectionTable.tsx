import React, { useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModesModel,
  GridValidRowModel,
  GridRowSelectionModel,
  GridColumnVisibilityModel
} from '@mui/x-data-grid';
import { Box, Dialog, DialogTitle } from '@mui/material';
import { heIL } from '@mui/x-data-grid/locales';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';
import { BaseRepository } from '../repositories/BaseRepository';
import CustomToolbar from './CustomToolbar';
import { CachingRepository } from '../repositories/caching/CachingRepository';
import './CollectionTable.css';
import DeleteModal from '../study-material/DeleteModal';

/**
 * Represents the format of messages used in the CollectionTable component.
 *
 * @template T - The type of item in the collection.
 */
interface MessageFormat<T> {
  deleteSuccess: () => string;
  deleteError: () => string;
  deleteConfirmation: (item: T) => string;
  updateSuccess: (item: T) => string;
  updateError: (item: T) => string;
}

/**
 * Actions interface for managing collection table.
 */
interface Actions {
  handleEditClick: (id: GridRowId) => () => void;
  handleSaveClick: (id: GridRowId) => () => void;
  handleCancelClick: (id: GridRowId) => () => void;
  deleteItem: (id: GridRowId) => void;
}

/**
 * Props for the CollectionTable component.
 *
 * @template T - The type of the items in the collection.
 */
interface CollectionTableProps<T> {
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
    showMessage: (message: FeedbackMessage) => void,
    onRowDeleted: (row: GridRowModel) => void
  ) => GridColDef[];
  repository?: BaseRepository<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FormComponent?: React.FC<any>;
  getItems?: () => Promise<T[]>;
  messageFormat: MessageFormat<T>;
  onRowSelected?: (row: GridRowModel | null) => void;
  onDelete?: (item: T) => Promise<void>;
  columnVisibilityModel?: GridColumnVisibilityModel;
  onHelpClick?: () => void;
}

/**
 * Represents a table component for managing collections.
 *
 * @template T - The type of items in the collection.
 *
 * @param {CollectionTableProps<T>} props - The props for the CollectionTable component.
 * @param {Function} props.generateColumns - A function that generates the columns for the table.
 * @param {Repository<T>} props.repository - The repository for accessing the collection data.
 * @param {React.ComponentType<FormComponentProps<T>>} props.FormComponent - The form component for adding/editing items.
 * @param {Function} props.getItems - A function that retrieves the items for the table.
 * @param {MessageFormat} props.messageFormat - The message format for displaying feedback messages.
 * @param {Function} props.onRowSelected - A callback function for when a row is selected.
 * @param {Function} props.onDelete - A callback function for deleting an item.
 * @param {GridColumnVisibilityModel} props.columnVisibilityModel - The column visibility model for the table.
 * @param {Function} props.onHelpClick - A callback function for when the help button is clicked.
 *
 * @returns {JSX.Element} The rendered CollectionTable component.
 */
const CollectionTable = <T extends { id: string }>({
  generateColumns,
  repository,
  FormComponent,
  getItems,
  messageFormat,
  onRowSelected,
  onDelete,
  columnVisibilityModel,
  onHelpClick
}: CollectionTableProps<T>) => {
  const [rows, setRows] = useState<(T & { isNew: boolean })[] | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [columnVisibility, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(columnVisibilityModel || {});
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);
  const [showAddItemForm, setShowItemForm] = useState(false);
  const [initialItem, setInitialItem] = useState<T | null>(null);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [itemDeletionConfirmation, setDeleteConfirmation] = useState<T>();

  useEffect(() => {
    function fetchItems() {
      (getItems !== undefined ? getItems() : repository!.find())
        .then((items) => setRows(items.map((item: T) => ({ ...item, isNew: false }))))
        .catch(() => {
          showMessage({
            message: 'התרחשה שגיאה בטעינת הנתונים',
            variant: 'error'
          });
        });
    }

    if (!rows) fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, repository]);

  const handleDelete = () => {
    if (!itemDeletionConfirmation) return;

    onDelete!(itemDeletionConfirmation)
      .then(() => {
        setRows(rows!.filter((item) => item.id !== itemDeletionConfirmation.id));
        showMessage({
          message: messageFormat.deleteSuccess(),
          variant: 'success'
        });
        setDeleteConfirmation(undefined);
      })
      .catch(() => {
        showMessage({
          message: messageFormat.deleteError(),
          variant: 'error'
        });
        setDeleteConfirmation(undefined);
      });
  };

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleRowSelection = useCallback(
    (selection: GridRowSelectionModel) => {
      if (!onRowSelected) return;

      if (selection.length === 0) {
        setSelectionModel([]);
        if (onRowSelected) onRowSelected(null);
        return;
      }

      const selectedId = selection[0];
      const selected = rows?.find((register) => register.id === selectedId) || null;

      setSelectionModel(selection.map((id) => id));
      onRowSelected(selected);
    },
    [rows]
  );

  const updateItem = (updatedItem: T) => {
    if (updatedItem === initialItem) {
      setShowItemForm(false);
      showMessage({
        message: 'לא בוצעו שינויים',
        variant: 'info'
      });
      return;
    }

    const id = updatedItem.id;
    repository!
      .update(updatedItem.id, updatedItem)
      .then(() => {
        const extendedItem = { ...updatedItem, id: id, isNew: false };
        const updatedRows = rows!.map((row) => (row.id === id ? extendedItem : row));
        setRows(updatedRows);
        showMessage({
          message: messageFormat.updateSuccess(updatedItem),
          variant: 'success'
        });
        setShowItemForm(false);
      })
      .catch(() => {
        showMessage({
          message: messageFormat.updateError(updatedItem),
          variant: 'error'
        });
      });
  };

  const handleRefresh = () => {
    if (repository instanceof CachingRepository) {
      repository.invalidateCache();
    }

    setRows(null);
  };

  const processRowUpdate = (newRow: GridRowModel): GridValidRowModel => {
    const { _, ...updatedRow } = newRow as any;

    repository!
      .update(updatedRow.id, updatedRow as T)
      .then(() => {
        showMessage({
          message: messageFormat.updateSuccess(updatedRow),
          variant: 'success'
        });
      })
      .catch(() => {
        showMessage({
          message: messageFormat.updateError(updatedRow),
          variant: 'error'
        });
      });

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = generateColumns(rows, setRows, setShowItemForm, setInitialItem, showMessage, (row) => {
    const { isNew, ...item } = row;
    setDeleteConfirmation(item as T);
  });

  return (
    <>
      {itemDeletionConfirmation && (
        <DeleteModal
          onDelete={handleDelete}
          onCancel={() => setDeleteConfirmation(undefined)}
          message={messageFormat.deleteConfirmation(itemDeletionConfirmation!)}
        />
      )}

      <Dialog
        open={showAddItemForm}
        onClose={() => setShowItemForm(false)}
        fullWidth
        maxWidth="sm"
        className="dialog-container">
        <DialogTitle
          sx={{ fontSize: '40px', border: 'none', textAlign: 'center', backgroundColor: 'background.paper' }}>
          עריכת פריט
        </DialogTitle>
        {FormComponent && initialItem && (
          <FormComponent saveItem={updateItem} initialItem={initialItem} setShowItemForm={setShowItemForm} />
        )}
      </Dialog>
      <Box className="table-container" sx={{ bgcolor: '#1d1b1b' }}>
        <div className="data-grid-container">
          <DataGrid
            rows={rows || []}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50]}
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
                onHelpClick: onHelpClick,
                showQuickFilter: true
              }
            }}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            onRowSelectionModelChange={handleRowSelection}
            rowSelectionModel={selectionModel}
            onProcessRowUpdateError={(error) => console.error(error)}
            localeText={{
              ...heIL.components.MuiDataGrid.defaultProps.localeText,
              noRowsLabel: 'אין ניתונים להצגה',
              columnsManagementReset: 'איפוס',
              columnsManagementSearchTitle: 'חיפוש',
              columnsManagementShowHideAllText: 'הצג/הסתר הכל'
            }}
            columnVisibilityModel={columnVisibility}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            checkboxSelection
            className="data-grid"
          />
        </div>
      </Box>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
    </>
  );
};

export type { CollectionTableProps, MessageFormat, Actions };
export default CollectionTable;
