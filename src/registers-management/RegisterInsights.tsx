import { PieChart } from '@mui/x-charts';
import { InsightData } from '../insights/InsightPage';

const getRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const registerInsightList: InsightData = {
  title: 'תובנות על נרשמים',
  insights: [
    {
      question: 'איך התלמידים מגיעים למגמה?',
      generateGraph: () => {
        return (
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: getRandomValue(5, 20), label: 'בית הספר' },
                  { id: 1, value: getRandomValue(10, 25), label: 'עלון מנח"י' },
                  { id: 2, value: getRandomValue(15, 30), label: 'קרוב משפחה שלמד במגמה' },
                  { id: 3, value: getRandomValue(20, 35), label: 'חיפוש עצמי באינטרנט' },
                  { id: 4, value: getRandomValue(25, 40), label: 'אחרת' }
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
      question: 'כמה יחידות לימוד במתמטיקה לומדים התלמידים?',
      generateGraph: () => {
        return (
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: getRandomValue(5, 20), label: '3' },
                  { id: 1, value: getRandomValue(10, 25), label: '4' },
                  { id: 2, value: getRandomValue(15, 30), label: '5' },
                  { id: 3, value: getRandomValue(20, 35), label: 'אחרת' }
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
      question: 'מה התלמידים מעדיפים ללמוד?',
      generateGraph: () => {
        return (
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: getRandomValue(5, 20), label: 'מכטרוניקה 5 יח"ל' },
                  { id: 1, value: getRandomValue(10, 25), label: 'מכטרוניקה 10 יח"ל' },
                  { id: 2, value: getRandomValue(15, 30), label: 'עדיין לא ידוע' },
                  { id: 3, value: getRandomValue(20, 35), label: 'אחרת' }
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
              }
            ]}
            height={200}
          />
        );
      }
    }
  ]
};

export default registerInsightList;
