import { InsightData } from '../insights/InsightPage';
import { IEvent } from './repository/Event';
import { BarChart, Gauge, LineChart, PieChart, ScatterChart, ScatterValueType } from '@mui/x-charts';

const events: IEvent[] = [
  { id: '1', title: 'סדנת מתמטיקה', details: 'יסודות האלגברה', imageURL: 'math.jpg', date: new Date() },
  { id: '2', title: 'יריד מדע', details: 'תערוכות ביולוגיה וכימיה', imageURL: 'science.jpg', date: new Date() },
  { id: '3', title: 'הרצאת היסטוריה', details: 'סקירה של היסטוריה עולמית', imageURL: 'history.jpg', date: new Date() }
];

const students: BriefStudent[] = [
  { id: '1', name: 'יוחנן כהן', email: 'john@example.com', phone: '1234567890' },
  { id: '2', name: 'חנה לוי', email: 'jane@example.com', phone: '0987654321' },
  { id: '3', name: 'אליס בראון', email: 'alice@example.com', phone: '1122334455' }
];

const registrations: { eventId: string; studentId: string }[] = [
  { eventId: '1', studentId: '1' },
  { eventId: '2', studentId: '2' },
  { eventId: '3', studentId: '3' },
  { eventId: '1', studentId: '2' }
];

const eventInsights: InsightData = {
  title: 'תובנות על אירועים',
  insights: [
    {
      question: 'כמה תלמידים נרשמו לכל אירוע?',
      generateGraph: () => {
        const registrationCount = events.map((event) => ({
          id: event.id,
          value: registrations.filter((reg) => reg.eventId === event.id).length,
          label: event.title
        }));

        return (
          <BarChart
            xAxis={[
              {
                data: registrationCount.map((item) => item.label),
                label: 'אירוע',
                axisId: 'x'
              }
            ]}
            series={[
              {
                data: registrationCount.map((item) => item.value)
              }
            ]}
            height={200}
          />
        );
      }
    },
    {
      question: 'מהי חלוקת התלמידים בין האירועים?',
      generateGraph: () => {
        const registrationCount = events.map((event) => ({
          id: event.id,
          value: registrations.filter((reg) => reg.eventId === event.id).length,
          label: event.title
        }));

        return (
          <PieChart
            series={[
              {
                data: registrationCount,
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
      question: 'כיצד התפתחו ההרשמות לאירועים לאורך הזמן?',
      generateGraph: () => {
        const registrationCountByDate = registrations.reduce(
          (acc, reg) => {
            const event = events.find((e) => e.id === reg.eventId);
            if (event) {
              const date = event.date.toDateString();
              acc[date] = acc[date] ? acc[date] + 1 : 1;
            }
            return acc;
          },
          {} as Record<string, number>
        );

        return (
          <LineChart
            xAxis={[
              {
                data: Object.keys(registrationCountByDate),
                label: 'תאריך',
                axisId: 'x',
                scaleType: 'time'
              }
            ]}
            series={[
              {
                data: Object.entries(registrationCountByDate).map(([_, count]) => count),
                label: 'מספר הרשמות'
              }
            ]}
            height={200}
          />
        );
      }
    },
    {
      question: 'מספר הרשמות ממוצע לכל אירוע',
      generateGraph: () => {
        const totalRegistrations = registrations.length;
        const averageRegistrations = totalRegistrations / events.length;

        return (
          <Gauge
            series={[
              {
                data: [{ value: averageRegistrations, label: 'ממוצע הרשמות' }]
              }
            ]}
            height={200}
          />
        );
      }
    },
    {
      question: 'גרף פיזור של הרשמות לאירועים מול תאריכים',
      generateGraph: () => {
        const scatterData: ScatterValueType[] = registrations
          .map((reg) => {
            const event = events.find((e) => e.id === reg.eventId);
            return event
              ? ({
                  id: event.id,
                  x: event.date.getTime(),
                  y: 1
                } as ScatterValueType)
              : null;
          })
          .filter((item) => item !== null);

        return (
          <ScatterChart
            series={[
              {
                data: scatterData,
                label: 'מספר הרשמות'
              }
            ]}
            height={200}
          />
        );
      }
    }
  ]
};

export default eventInsights;
