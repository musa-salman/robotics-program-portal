import EventCard, { EventProps } from './EventCard';
import { useState, useEffect } from 'react';
import { useEventService } from './repository/EventContext';
import { IEvent } from './repository/Event';
import { CircularProgress, Box } from '@mui/material';
import './EventContainer.css';
import EmptyEventCard from './EmptyEventCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from '@mui/material/styles';

type EventContainer = {
  eventsProps: EventProps[];
};

const EventContainer = () => {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const eventRepository = useEventService().eventRepository;
  const theme = useTheme();

  const handleShiftEventsRight = () => {
    if (events !== null) setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleShiftEventsLeft = () => {
    if (events !== null) setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, events.length - 3));
  };

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
        newEvents.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
      <div className="events-container-default-style">
        <div className="shift-buttons" style={{ backgroundColor: theme.palette.primary.main }}>
          <ArrowForwardIosIcon onClick={handleShiftEventsRight} />
        </div>
        <div className="events-show">
          {events.slice(currentIndex, currentIndex + 3).map((event) => (
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
        <div className="shift-buttons" style={{ backgroundColor: theme.palette.primary.main }}>
          <ArrowBackIosIcon onClick={handleShiftEventsLeft} />
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
