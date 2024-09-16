import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import Preference from './Preference';
import { Cancel, Edit, Save } from '@mui/icons-material';

interface PreferenceProps {
  onPreferenceChange: (preference: Preference) => void;
  preference: Preference; // The preference object being edited
}

const PreferenceCard: React.FC<PreferenceProps> = ({ onPreferenceChange, preference }) => {
  const [editedPreference, setEditedPreference] = useState<Preference>(preference);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof Preference, value: string) => {
    setEditedPreference((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onPreferenceChange(editedPreference);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {preference.key}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isEditing ? (
              <TextField
                label="Value"
                value={editedPreference.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{editedPreference.value}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => setIsEditing((prev) => !prev)}>{isEditing ? <Cancel /> : <Edit />}</IconButton>
            <Grid item xs={12}>
              {isEditing && (
                <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSave}>
                  שמור
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PreferenceCard;
