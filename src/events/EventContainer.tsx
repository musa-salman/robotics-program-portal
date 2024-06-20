import EventCard, { EventProps } from './EventCard';
import { Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { eventManagerContext } from './repository/EventManagerContext';
import { IEvent } from './repository/Event';
import { CircularProgress, Box } from '@mui/material';
import './EventContainer.css';
import EmptyEventCard from './EmptyEventCard';
import AddEvent from './AddEvent';

type EventContainer = {
  eventsProps: EventProps[];
};

const EventContainer = () => {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModalAllEvents, setShowModalAllEvents] = useState(true);

  const eventManager = useContext(eventManagerContext);
  const eventRepository = eventManager.eventRepository;

  const handleAllEvents = () => {
    setShowModalAllEvents(!showModalAllEvents);
  };

  const handleShiftEventsRight = () => {
    if (events !== null) setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleShiftEventsLeft = () => {
    if (events !== null) setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, events.length - 3));
  };

  useEffect(() => {
    const getEvents = async () => {
      setEvents(convertIEventsToEventProps(await eventRepository.find()));
    };
    if (events === null) getEvents();
  }, [events]);

  const addEvent = (newEvent: EventProps) => {
    if (events !== null) setEvents([...events, newEvent]);
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
        onEventEdit: onEventEdit
      };
    });
  }

  function onEventDelete(id: string) {
    setEvents((events || []).filter((e) => e.id !== id));
  }

  function onEventEdit(updatedEvent: EventProps) {
    setEvents((prevEvents) => {
      if (!prevEvents) return [];
      const index = prevEvents.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        // Create a new array with the updated event
        const newEvents = [...prevEvents];
        newEvents[index] = updatedEvent;
        return newEvents;
      }
      // If the event was not found, return the previous state
      return prevEvents;
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
        <AddEvent addEvent={addEvent} />
        <Button className="show-all" onClick={handleAllEvents}>
          {showModalAllEvents ? <div>הצג הכול</div> : <div>הראי פחות</div>}
        </Button>
      </div>
      {showModalAllEvents ? (
        <div className="events-container-default-style">
          <Button className="shift-buttons" variant="primary" onClick={handleShiftEventsRight}>
            &lt;
          </Button>
          {events
            .sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(currentIndex, currentIndex + 3)
            .map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                date={event.date}
                title={event.title}
                details={event.details}
                image={event.image}
                onEventDelete={onEventDelete}
                onEventEdit={onEventEdit}
              />
            ))}
          <Button className="shift-buttons" variant="primary" onClick={handleShiftEventsLeft}>
            &gt;
          </Button>
        </div>
      ) : (
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventContainer;
