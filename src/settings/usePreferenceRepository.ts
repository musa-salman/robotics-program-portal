import { useContext } from 'react';
import { PreferenceContext } from './PreferenceContext';

function usePreferenceRepository() {
  const preferenceRepository = useContext(PreferenceContext);
  if (preferenceRepository === undefined) {
    throw new Error('usePreferenceRepository must be used within a PreferenceProvider');
  }
  return preferenceRepository;
}

export { usePreferenceRepository };
