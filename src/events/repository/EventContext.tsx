import { createContext, useContext } from 'react';
import { EventService } from './EventService';

/**
 * Context for the EventService.
 */
const EventServiceContext = createContext<EventService | undefined>(undefined);

/**
 * Props for the EventProvider component.
 */
interface EventProviderProps {
  children: React.ReactNode;
  eventService: EventService;
}

/**
 * Provides the event service to the children components.
 *
 * @param children - The child components.
 * @param eventService - The event service to be provided.
 * @returns The JSX element.
 */
function EventProvider({ children, eventService }: EventProviderProps): JSX.Element {
  return <EventServiceContext.Provider value={eventService}>{children}</EventServiceContext.Provider>;
}

/**
 * Custom hook that provides the EventService from the EventServiceContext.
 * Throws an error if used outside of an EventProvider.
 *
 * @returns The EventService instance.
 * @throws Error if used outside of an EventProvider.
 */
export function useEventService(): EventService {
  const eventService = useContext(EventServiceContext);
  if (!eventService) {
    throw new Error('useEventService must be used within a EventProvider');
  }
  return eventService;
}

export default EventProvider;
