import EventCard, { EventProps } from './EventCard';
import { useEventService } from './repository/EventContext';
import { IEvent } from './repository/Event';
import { CircularProgress, Box } from '@mui/material';
import './EventContainer.css';
import EmptyEventCard from './EmptyEventCard';
import AddEvent from './AddEvent';
import RoleBasedAccessControl from '../authentication/components/RoleBasedAccessControl';
import Role from '../authentication/components/Roles';
import { useEffect, useState } from 'react';

type EventContainer = {
  eventsProps: EventProps[];
};

const EventContainer = () => {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [animatingEvents, setAnimatingEvents] = useState<{ [key: string]: boolean }>({});

  const eventRepository = useEventService().eventRepository;

  useEffect(() => {
    const getEvents = () => {
      eventRepository
        .find()
        .then((events) =>
          setEvents(
            convertIEventsToEventProps(events).sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime())
          )
        );
    };
    if (events === null) getEvents();
  }, [events]);

  const addEvent = (newEvent: EventProps) => {
    if (events !== null) {
      const updatedEvents = [...events, newEvent];
      updatedEvents.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEvents(updatedEvents);
      setAnimatingEvents((prev) => ({ ...prev, [newEvent.id]: true }));
      setTimeout(() => setAnimatingEvents((prev) => ({ ...prev, [newEvent.id]: false })), 500);
    }
  };

  const onEventDelete = (id: string) => {
    setAnimatingEvents((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setEvents((events || []).filter((e) => e.id !== id));
      setAnimatingEvents((prev) => ({ ...prev, [id]: false }));
    }, 500); // Match the animation duration
  };

  const onEventEdit = (updatedEvent: EventProps) => {
    setEvents((prevEvents) => {
      if (!prevEvents) return [];
      const index = prevEvents.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        const newEvents = [...prevEvents];
        newEvents[index] = updatedEvent;
        newEvents.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return newEvents;
      }
      return prevEvents;
    });
  };

  function convertIEventsToEventProps(events: IEvent[]): EventProps[] {
    return events.map((event) => {
      return {
        date: event.date,
        title: event.title,
        details: event.details,
        image: event.imageURL,
        id: event.id,
        onEventDelete: onEventDelete,
        onEventEdit: onEventEdit,
        animating: false // New prop for animation state
      };
    });
  }

  if (events === null) {
    return (
      <Box className="loading-event">
        <CircularProgress />
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <>
        <EmptyEventCard addEvent={addEvent} />
      </>
    );
  }

  return (
    <div className="events">
      <div className="events-header-button">
        <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
          <AddEvent addEvent={addEvent} />
        </RoleBasedAccessControl>
      </div>
      <div className="events-container-show-all-events-style">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            date={event.date}
            title={event.title}
            details={event.details}
            image={event.image}
            onEventDelete={onEventDelete}
            onEventEdit={onEventEdit}
            animating={animatingEvents[event.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default EventContainer;
