import * as React from 'react';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarProps,
  ToolbarPropsOverrides
} from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import UploadFile from '@mui/icons-material/UploadFile';
import Refresh from '@mui/icons-material/Refresh';
import './CustomToolbar.css';

const CustomToolbar: React.JSXElementConstructor<GridToolbarProps & ToolbarPropsOverrides> = ({
  onAddClick,
  onCSVImportClick,
  onRefreshClick
}) => {
  return (
    <GridToolbarContainer className="custom-toolbar">
      <div className="custom-toolbar__left">
        <GridToolbarQuickFilter className="custom-toolbar__quick-filter" />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </div>
      <div className="custom-toolbar__right">
        <Tooltip title="הוסף תלמיד">
          <IconButton color="primary" onClick={onAddClick} size="small" className="custom-toolbar__button">
            <PersonAdd />
          </IconButton>
        </Tooltip>
        <Tooltip title="ייבוא מ-CSV">
          <IconButton color="primary" onClick={onCSVImportClick} className="custom-toolbar__button">
            <UploadFile />
          </IconButton>
        </Tooltip>
        <Tooltip title="רענון">
          <IconButton color="primary" onClick={onRefreshClick} className="custom-toolbar__button">
            <Refresh />
          </IconButton>
        </Tooltip>
      </div>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
