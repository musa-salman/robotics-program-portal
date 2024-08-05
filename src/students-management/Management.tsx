import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentsManagement from './StudentsManagement';
import RegisterManagement from '../registers-management/RegistersManagement';
import UsersManagement from '../users-management/UsersManagement';

/**
 * Props for the TabPanel component.
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * CustomTabPanel component represents a tab panel for managing custom tabs.
 *
 * @component
 * @param {TabPanelProps} props - The props for the CustomTabPanel component.
 * @returns {JSX.Element} The rendered CustomTabPanel component.
 */
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

/**
 * Generates accessibility props for a tab.
 *
 * @param index - The index of the tab.
 * @returns An object containing the id and aria-controls properties for the tab.
 */
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

/**
 * Component for managing students, roles, and registrations.
 */
const Management = () => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={(_, newNumber) => handleChange(newNumber)} aria-label="basic tabs example">
            <Tab label="תלמידים" {...a11yProps(0)} />
            <Tab label="תפקידים" {...a11yProps(1)} />
            <Tab label="נרשמים" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <StudentsManagement />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <UsersManagement />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <RegisterManagement />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Management;
