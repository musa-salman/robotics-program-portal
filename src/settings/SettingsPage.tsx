import React, { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import Preference from './Preference';
import PreferenceCard from './PreferenceCard';
import { usePreferenceRepository } from './usePreferenceRepository';

const SettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useState<Preference[] | null>(null);
  const preferenceRepo = usePreferenceRepository();

  useEffect(() => {
    const fetchPreferences = async () => {
      preferenceRepo
        .find()
        .then((prefs) => {
          setPreferences(prefs);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    if (!preferences) fetchPreferences();
  }, []);

  const handlePreferenceChange = (preference: Preference) => {
    preferenceRepo.update(preference.id, preference).then(() => {
      setPreferences((prev) => {
        if (!prev) return null;
        return prev.map((p) => (p.id === preference.id ? preference : p));
      });
    });
  };

  return (
    <Container>
      {preferences !== null ? (
        <Grid container spacing={2}>
          {preferences.length === 0 ? (
            <p>אין הגדרות זמינות</p>
          ) : (
            preferences.map((preference) => (
              <Grid item xs={12} key={preference.id}>
                <PreferenceCard preference={preference} onPreferenceChange={handlePreferenceChange} />
              </Grid>
            ))
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default SettingsPage;
