import { createContext, useContext } from 'react';
import { SettingRepository } from './SettingRepository';

export const SettingContext = createContext<SettingRepository>(new SettingRepository());

function SettingProvider({ children }: { children: React.ReactNode }) {
  const SettingRepository = useContext(SettingContext);

  return <SettingContext.Provider value={SettingRepository}>{children}</SettingContext.Provider>;
}

export default SettingProvider;
