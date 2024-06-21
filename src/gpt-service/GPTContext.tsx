import { createContext, useContext } from 'react';
import { GPTService } from './GPTService';
import { IGPTService } from './IGPTService';

export const GPTServiceContext = createContext<IGPTService>(
  new GPTService(import.meta.env.VITE_REACT_APP_OPENAI_API_KEY)
);

function GPTServiceProvider({ children }: { children: React.ReactNode }) {
  const gptService = useContext(GPTServiceContext);

  return <GPTServiceContext.Provider value={gptService}>{children}</GPTServiceContext.Provider>;
}

export default GPTServiceProvider;
