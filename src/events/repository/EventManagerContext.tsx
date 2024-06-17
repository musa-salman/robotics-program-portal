import { createContext, useContext } from 'react';
import { EventManager } from './EventManager';

export const eventManagerContext = createContext<EventManager>(new EventManager());
function EventManagerProvider({ children }: { children: React.ReactNode }) {
  const eventManager = useContext(eventManagerContext);

  return <eventManagerContext.Provider value={eventManager}>{children}</eventManagerContext.Provider>;
}

export default EventManagerProvider;
