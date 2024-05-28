import { createContext, useContext } from 'react';
import { EventRepository } from './EventRepository';

export const EventContext = createContext<EventRepository>(new EventRepository());

function EventProvider({ children } : { children: React.ReactNode }) {
  const eventRepository = useContext(EventContext);

  return (
    <EventContext.Provider value={eventRepository}>
      {children}
    </EventContext.Provider>
  );
}

export default EventProvider;