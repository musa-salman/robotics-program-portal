import { createContext, useContext } from 'react';
import { EventService } from './EventService';

export const eventServiceContext = createContext<EventService>(new EventService());
function EventProvider({ children }: { children: React.ReactNode }) {
  const eventService = useContext(eventServiceContext);

  return <eventServiceContext.Provider value={eventService}>{children}</eventServiceContext.Provider>;
}

export default EventProvider;
