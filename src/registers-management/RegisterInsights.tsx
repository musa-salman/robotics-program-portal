import { PieChart } from '@mui/x-charts';
import { InsightData } from '../Insights/InsightPage';

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
                  { id: 0, value: 10, label: 'בית הספר' },
                  { id: 1, value: 15, label: 'עלון מנח"י' },
                  { id: 2, value: 20, label: 'קרוב משפחה שלמד במגמה' },
                  { id: 3, value: 25, label: 'חיפוש עצמי באינטרנט' },
                  { id: 4, value: 30, label: 'אחרת' }
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
                  { id: 0, value: 10, label: '3' },
                  { id: 1, value: 15, label: '4' },
                  { id: 2, value: 20, label: '5' },
                  { id: 3, value: 25, label: 'אחרת' }
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
                  { id: 0, value: 10, label: 'מכטרוניקה 5 יח"ל' },
                  { id: 1, value: 15, label: 'מכטרוניקה 10 יח"ל' },
                  { id: 2, value: 20, label: 'עדיין לא ידוע' },
                  { id: 3, value: 25, label: 'אחרת' }
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
