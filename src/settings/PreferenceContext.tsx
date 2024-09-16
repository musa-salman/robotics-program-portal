import { createContext, useContext } from 'react';
import { PreferenceRepository } from './PreferenceRepository';
import { CachingRepository } from '../repositories/caching/CachingRepository';

const PreferenceContext = createContext<PreferenceRepository | undefined>(undefined);

function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const preferenceRepository = new CachingRepository(new PreferenceRepository());

  return <PreferenceContext.Provider value={preferenceRepository}>{children}</PreferenceContext.Provider>;
}

function usePreferenceRepository() {
  const preferenceRepository = useContext(PreferenceContext);
  if (preferenceRepository === undefined) {
    throw new Error('usePreferenceRepository must be used within a PreferenceProvider');
  }
  return preferenceRepository;
}

export { PreferenceContext, PreferenceProvider, usePreferenceRepository };
