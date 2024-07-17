import EventCard, { EventProps } from './EventCard';
import { useState, useEffect } from 'react';
import { useEventService } from './repository/EventContext';
import { IEvent } from './repository/Event';
import './EventContainer.css';
import EmptyEventCard from './EmptyEventCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from '@mui/material/styles';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';
import SkeletonEventCard from './EventCardSkeleton';

type EventContainer = {
  eventsProps: EventProps[];
};

const EventContainer = () => {
  const [events, setEvents] = useState<EventProps[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (animationClass) {
      const timeout = setTimeout(() => {
        setAnimationClass('');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [animationClass]);

  const [message, setMessage] = useState<FeedbackMessage | undefined>(undefined);
  const [buildNumber, setBuildNumber] = useState<number>(0);

  const eventRepository = useEventService().eventRepository;
  const theme = useTheme();

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

  const handleShiftEventsRight = () => {
    if (events && currentIndex < events.length - 3) {
      setAnimationClass('fade-out');
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setAnimationClass('fade-in');
      }, 400);
    }
  };

  const handleShiftEventsLeft = () => {
    if (currentIndex > 0) {
      setAnimationClass('fade-out');
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setAnimationClass('fade-in');
      }, 400);
    }
  };

  useEffect(() => {
    const getEvents = () => {
      eventRepository
        .find()
        .then((events) =>
          setEvents(
            convertIEventsToEventProps(events).sort(
              (b, a) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            )
          )
        )
        .catch(() => showMessage({ message: 'שגיאה בטעינת האירועים', variant: 'error' }));
    };
    if (events === null) getEvents();
  }, [events]);

  const addEvent = (newEvent: EventProps) => {
    if (events !== null) setEvents([...events, newEvent]);
  };

  function convertIEventsToEventProps(events: IEvent[]): EventProps[] {
    return events.map((event) => {
      return {
        date: event.startDate,
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
        newEvents.sort((b, a) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        return newEvents;
      }
      // If the event was not found, return the previous state
      return prevEvents;
    });
  }

  if (events && events.length === 0) {
    return (
      <>
        <EmptyEventCard addEvent={addEvent} />
      </>
    );
  }

  return (
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      <div className="events">
        <div className="events-container-default-style">
          <div className="shift-buttons" style={{ backgroundColor: theme.palette.primary.main }}>
            <ArrowForwardIosIcon onClick={handleShiftEventsLeft} />
          </div>
          <div className="events-show">
            {events === null
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <SkeletonEventCard key={index} />)
              : events.slice(currentIndex, currentIndex + 3).map((event, index) => (
                  <div key={event.id} className={`event-card ${animationClass} ${index < 3 ? 'visible' : ''}`}>
                    <EventCard
                      id={event.id}
                      startDate={event.startDate}
                      title={event.title}
                      details={event.details}
                      image={event.image}
                      onEventDelete={onEventDelete}
                      onEventEdit={onEventEdit}
                    />
                  </div>
                ))}
          </div>
          <div className="shift-buttons" style={{ backgroundColor: theme.palette.primary.main }}>
            <ArrowBackIosIcon onClick={handleShiftEventsRight} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventContainer;
