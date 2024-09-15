import { Grid, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { SettingContext } from './SettingContext';
import { Setting } from './Setting';

const SettingComponent = () => {
  const [value, setValue] = useState<Setting | null>(null);
  const settingService = useContext(SettingContext);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (loading && value === null) {
      settingService;
      setLoading(false);
    }
  }, [value]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="כותרת"
            name="title"
            defaultValue={''}
            value={value}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SettingComponent;
