import { BarChart, LineChart, ScatterChart, Gauge, ScatterValueType } from '@mui/x-charts';
import { InsightData } from '../insights/InsightPage';
import { DocumentInfo } from './service/DocumentInfo';
import { StudentDocument } from './service/StudentDocument';

const documents: DocumentInfo[] = [
  { id: '1', name: 'טופס הרשמה', filename: 'registration_form.pdf', description: 'טופס הרשמה למערכת' },
  { id: '2', name: 'אישור רפואי', filename: 'medical_certificate.pdf', description: 'אישור רפואי תקף' },
  { id: '3', name: 'הצהרת הורים', filename: 'parent_declaration.pdf', description: 'הצהרת הורים מאושרת' }
];

const studentDocuments: StudentDocument[] = [
  { id: '1', studentId: '1', documentId: '1', documentName: 'טופס הרשמה', filename: 'registration_form_signed.pdf' },
  { id: '2', studentId: '2', documentId: '2', documentName: 'אישור רפואי', filename: 'medical_certificate_signed.pdf' },
  { id: '3', studentId: '1', documentId: '3', documentName: 'הצהרת הורים', filename: 'parent_declaration_signed.pdf' },
  { id: '4', studentId: '3', documentId: '1', documentName: 'טופס הרשמה', filename: 'registration_form_signed.pdf' }
];

const documentInsights: InsightData = {
  title: 'תובנות על מסמכים',
  insights: [
    {
      question: 'כיצד התפתחו ההגשות של מסמכים לאורך הזמן?',
      generateGraph: () => {
        const documentSubmissionDates = studentDocuments.reduce(
          (acc, doc) => {
            acc[doc.id] = (acc[doc.id] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        return (
          <LineChart
            xAxis={[
              {
                data: Object.keys(documentSubmissionDates),
                label: 'תאריך',
                axisId: 'x',
                scaleType: 'time'
              }
            ]}
            series={[
              {
                data: Object.values(documentSubmissionDates),
                label: 'מספר הגשות'
              }
            ]}
            height={200}
          />
        );
      }
    },
    {
      question: 'מספר הגשות ממוצע לכל מסמך',
      generateGraph: () => {
        const totalSubmissions = studentDocuments.length;
        const averageSubmissions = totalSubmissions / documents.length;

        return (
          <Gauge
            series={[
              {
                data: [{ value: averageSubmissions, label: 'ממוצע הגשות' }]
              }
            ]}
            height={200}
          />
        );
      }
    },
    {
      question: 'גרף פיזור של הגשות מסמכים לפי תלמידים ותאריכים',
      generateGraph: () => {
        const scatterData: ScatterValueType[] = studentDocuments.map((doc) => {
          const date = new Date().getTime(); // Replace with actual submission date if available
          return {
            id: doc.studentId,
            x: date,
            y: 1
          };
        });

        return (
          <ScatterChart
            series={[
              {
                data: scatterData,
                label: 'מספר הגשות'
              }
            ]}
            height={200}
          />
        );
      }
    }
  ]
};

export default documentInsights;
