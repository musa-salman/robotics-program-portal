import { createContext, useContext } from 'react';
import { EventService } from './EventService';

const EventServiceContext = createContext<EventService | undefined>(undefined);

interface EventProviderProps {
  children: React.ReactNode;
  eventService: EventService;
}

function EventProvider({ children, eventService }: EventProviderProps): JSX.Element {
  return <EventServiceContext.Provider value={eventService}>{children}</EventServiceContext.Provider>;
}

export function useEventService(): EventService {
  const eventService = useContext(EventServiceContext);
  if (!eventService) {
    throw new Error('useEventService must be used within a EventProvider');
  }
  return eventService;
}

export default EventProvider;
