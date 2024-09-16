import { createContext } from 'react';
import { PreferenceRepository } from './PreferenceRepository';
import { CachingRepository } from '../repositories/caching/CachingRepository';

const PreferenceContext = createContext<PreferenceRepository | undefined>(undefined);

function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const preferenceRepository = new CachingRepository(new PreferenceRepository());

  return <PreferenceContext.Provider value={preferenceRepository}>{children}</PreferenceContext.Provider>;
}

export { PreferenceContext, PreferenceProvider };
