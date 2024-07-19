import EventCard, { EventProps } from './EventCard';
import { useEventService } from './repository/EventContext';
import { IEvent } from './repository/Event';
import { CircularProgress, Box, Button, Input } from '@mui/material';
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
  const [searchQuery, setSearchQuery] = useState('');

  const eventRepository = useEventService().eventRepository;
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  // Effect to sort events whenever sortField or sortDirection changes
  useEffect(() => {
    if (sortField) {
      sortEvents(sortField, sortDirection);
    }
  }, [sortField, sortDirection]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events?.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.startDate?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered || []);
    }
  }, [searchQuery, events]);

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
        );
    };
    if (events === null) getEvents();
  }, [events]);

  const sortEvents = (field: string, direction: string) => {
    if (filteredEvents === null) {
      return;
    }
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      if (field === 'date') {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (field === 'title') {
        return direction === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else {
        return 0;
      }
    });
    setFilteredEvents(sortedEvents);
  };

  const addEvent = (newEvent: EventProps) => {
    if (events !== null) {
      const updatedEvents = [...events, newEvent];
      updatedEvents.sort((b, a) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
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
        newEvents.sort((b, a) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        return newEvents;
      }
      return prevEvents;
    });
  };

  function convertIEventsToEventProps(events: IEvent[]): EventProps[] {
    return events.map((event) => {
      return {
        startDate: event.startDate,
        endDate: event.endDate,
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
    <Box className="mat-in-box" sx={{ marginTop: '20px', borderRadius: '5px' }}>
      <div className="events">
        <div className="events-all">
          <div className="events-header-button">
            <RoleBasedAccessControl allowedRoles={[Role.Admin, Role.Owner]} unauthorizedAuthenticatedComponent={<></>}>
              <AddEvent addEvent={addEvent} />
            </RoleBasedAccessControl>
            <Input
              placeholder="חיפוש אירועים לפי שם או תאריך או פרטים..."
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '70%' }}
            />
            <Button
              onClick={() => {
                setSortField('date');
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
              }}>
              מיין לפי תאריך {sortDirection === 'asc' && sortField === 'date' ? '↑' : '↓'}
            </Button>
            <Button
              onClick={() => {
                setSortField('title');
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
              }}>
              מיין לפי כותרת {sortDirection === 'asc' && sortField === 'title' ? '↑' : '↓'}
            </Button>
          </div>
          <div className="events-container-show-all-events-style">
            {filteredEvents
              ? filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    title={event.title}
                    details={event.details}
                    image={event.image}
                    onEventDelete={onEventDelete}
                    onEventEdit={onEventEdit}
                    animating={animatingEvents[event.id]}
                  />
                ))
              : events?.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    startDate={event.startDate}
                    endDate={event.endDate}
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
      </div>
    </Box>
  );
};

export default EventContainer;
