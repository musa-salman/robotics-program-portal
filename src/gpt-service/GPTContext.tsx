import { createContext, useContext } from 'react';
import { GPTService } from './GPTService';
import { IGPTService } from './IGPTService';

/**
 * Context object for the GPTService.
 * @typeParam IGPTService - The type of the GPTService.
 */
export const GPTServiceContext = createContext<IGPTService>(new GPTService());

/**
 * Provides the GPT service to its children components.
 *
 * @param children - The child components to be wrapped with the GPT service context.
 */
function GPTServiceProvider({ children }: { children: React.ReactNode }) {
  const gptService = useContext(GPTServiceContext);

  return <GPTServiceContext.Provider value={gptService}>{children}</GPTServiceContext.Provider>;
}

export default GPTServiceProvider;
