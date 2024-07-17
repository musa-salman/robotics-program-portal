import { useEffect, useState } from 'react';
import { InsightData } from '../insights/InsightPage';
import { BarChart, Gauge, LineChart, PieChart, PieValueType } from '@mui/x-charts';
import { useEventService } from './repository/EventContext';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import { IEvent } from './repository/Event';
import { error } from 'console';

const eventInsights: InsightData = {
  title: 'תובנות על אירועים',
  insights: [
    {
      question: 'מהי חלוקת התלמידים בין האירועים?',
      generateGraph: () => {
        const eventService = useEventService();
        const [registrationStats, setRegistrationStats] = useState<PieValueType[] | null>(null);

        console.log('inside function generateGraph');
        console.log('registrationStats', registrationStats);
        useEffect(() => {
          console.log('inside useEffect');
          if (registrationStats === null) {
            console.log('inside if', registrationStats);
            eventService
              .aggregateEventRegistrations()
              .then((data) => {
                const dataEntries = Object.entries(data).map(([key, value]) => ({
                  id: key,
                  value: value.count,
                  label: key
                }));
                setRegistrationStats(dataEntries);
              })
              .catch((error) => {
                console.log('error', error);
              });
          }
        }, [registrationStats,eventService]);
        if (registrationStats === null) {
          return <div>Loading...</div>;
        }
        return (
          <PieChart
            series={[
              {
                data: [
                  { id: 'event1', value: 5, label: 'אירוע 1' },
                  { id: 'event2', value: 10, label: 'אירוע 2' },
                  { id: 'event3', value: 20, label: 'אירוע 3' }
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
              }
            ]}
            height={200}
          />
        );
      }
    },
    {
      question: 'כמה תלמידים נרשמו לכל אירוע?',
      generateGraph: () => {
        const eventService = useEventService();
        const [eventMetrics, setEventMetrics] = useState<Record<string, IEvent & { count: number }> | null>(null);
        const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
        const [startDate, setStartDate] = useState<Moment | null>(null);
        const [endDate, setEndDate] = useState<Moment | null>(null);

        useEffect(() => {
          if (eventMetrics === null) {
            eventService.aggregateEventRegistrations().then((data) => {
              setSelectedEvents(Object.keys(data));
              setEventMetrics(data);
            }).catch((error) =>{
              console.error('Error fetching event metrics:', error);
            });
          }
        }, [eventMetrics, eventService]);
        if (eventMetrics === null) {
          return <div>Loading...</div>;
        }
        
        // const handleSelectedEvents = (event: any) => {
        //   event.preventDefault();
        //   event.stopPropagation();
        //   setSelectedEvents(event.target.value as string[]);
        // };

        // const handleDateRange = (date: Moment | null, type: 'start' | 'end') => {
        //   if (type === 'start') {
        //     setStartDate(date);
        //   } else {
        //     setEndDate(date);
        //   }

        //   if (startDate !== null && endDate !== null&& eventMetrics !== null) {
        //     console.log('eventMetrics', eventMetrics);
        //     setSelectedEvents(
        //       Object.keys(eventMetrics).filter((event) => {
        //         const eventDate = eventMetrics[event].startDate;
        //         return eventDate >= startDate.toDate() && eventDate <= endDate.toDate();
        //       })
        //     );
        //   }
        // };

        return (
          <>
            {/* <FormControl fullWidth sx={{ m: 1, display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <InputLabel id="demo-multiple-checkbox-label">בחר אירועים</InputLabel>
              <Select
                sx={{
                  width: '50%'
                }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedEvents}
                onChange={(event) => handleSelectedEvents(event)}
                renderValue={(selected) => selected.join(', ')}>
                {eventMetrics &&
                  Object.keys(eventMetrics).map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedEvents.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
              </Select>
              <LocalizationProvider adapterLocale={'he'} dateAdapter={AdapterMoment}>
                <DatePicker
                  label="תאריך התחלה"
                  onChange={(newValue) => {
                    handleDateRange(newValue, 'start');
                  }}
                />
                <DatePicker
                  label="תאריך סיום"
                  onChange={(newValue) => {
                    handleDateRange(newValue, 'end');
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <BarChart
              xAxis={[
                {
                  data: selectedEvents,
                  label: 'אירוע',
                  axisId: 'x',
                  scaleType: 'band'
                }
              ]}
              series={[
                {
                  data: selectedEvents.map((event) => (eventMetrics ? eventMetrics[event].count : 0))
                }
              ]}
              height={200}
            /> */}
             <PieChart
            series={[
              {
                data: [
                  { id: 'event1', value: 5, label: 'אירוע 1' },
                  { id: 'event2', value: 10, label: 'אירוע 2' },
                  { id: 'event3', value: 20, label: 'אירוע 3' }
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
              }
            ]}
            height={200}
          />
          </>
        );
      }
    },
    
    // {
    //   question: 'כיצד התפתחו ההרשמות לאירועים לאורך הזמן?',
    //   generateGraph: () => {
    //     const eventService = useEventService();
    //     const [registrationCountByDate, setRegistrationCountByDate] = useState<Record<
    //       number,
    //       IEvent & { count: number }
    //     > | null>(null);

    //     useEffect(() => {
    //       if (!registrationCountByDate) {
    //         eventService.eventCreationOverTime().then((data) => {
    //           setRegistrationCountByDate(data);
    //         });
    //       }
    //     }, [eventService, registrationCountByDate]);

    //     console.log('registrationCountByDate', registrationCountByDate);
    //     return (
    //       <LineChart
    //         xAxis={[
    //           {
    //             data: registrationCountByDate
    //               ? Object.keys(registrationCountByDate).map((date) => new Date(parseInt(date)))
    //               : [],
    //             label: 'תאריך',
    //             axisId: 'x',
    //             scaleType: 'time'
    //           }
    //         ]}
    //         series={[
    //           {
    //             data: registrationCountByDate ? Object.values(registrationCountByDate).map((event) => event.count) : [],
    //             label: 'מספר הרשמות'
    //           }
    //         ]}
    //         height={200}
    //       />
    //     );
    //   }
    // },
    // {
    //   question: 'מספר הרשמות ממוצע לכל אירוע',
    //   generateGraph: () => {
    //     const eventService = useEventService();
    //     const [averageRegistrations, setAverageRegistrations] = useState<number>();

    //     useEffect(() => {
    //       if (!averageRegistrations) {
    //         eventService.averageEventRegistrations().then((data) => {
    //           setAverageRegistrations(data);
    //         });
    //       }
    //     }, [eventService, averageRegistrations]);

    //     return (
    //       <Gauge
    //         series={[
    //           {
    //             data: [{ value: averageRegistrations, label: 'ממוצע הרשמות' }]
    //           }
    //         ]}
    //         height={200}
    //       />
    //     );
    //   }
    // }
  ]
};

export default eventInsights;
