import React from 'react';
import { GridColDef, GridRowModesModel } from '@mui/x-data-grid';

function defaultActions<T>(
  rows: (T & { isNew: boolean })[] | null,
  setRows: React.Dispatch<React.SetStateAction<(T & { isNew: boolean })[] | null>>,
  rowModesModel: GridRowModesModel,
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
): GridColDef {
  const defaultCol: GridColDef = {
    field: 'actions',
    type: 'actions',
    headerName: 'פעולות',
    width: 150,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [];
    }
  };

  return defaultCol;
}
