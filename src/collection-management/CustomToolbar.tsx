import * as React from 'react';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarProps,
  ToolbarPropsOverrides
} from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import Refresh from '@mui/icons-material/Refresh';
import './CustomToolbar.css';

/**
 * CustomToolbar component.
 *
 * @component
 * @example
 * ```tsx
 * <CustomToolbar onRefreshClick={handleRefreshClick} onHelpClick={handleHelpClick} />
 * ```
 */
const CustomToolbar: React.JSXElementConstructor<GridToolbarProps & ToolbarPropsOverrides> = ({
  onRefreshClick,
  onHelpClick
}) => {
  return (
    <GridToolbarContainer className="custom-toolbar">
      <div className="custom-toolbar__left">
        <GridToolbarQuickFilter className="custom-toolbar__quick-filter" />
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </div>
      <div className="custom-toolbar__right">
        {onHelpClick && (
          <Tooltip title="עזרה">
            <IconButton color="primary" onClick={onHelpClick} className="custom-toolbar__button">
              ?
            </IconButton>
          </Tooltip>
        )}
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
