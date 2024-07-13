import { BarChart, PieChart } from '@mui/x-charts';
import Role, { roleNames } from '../authentication/components/Roles';
import { InsightData } from '../Insights/InsightPage';

const userInsights: InsightData = {
  title: 'תובנות על משתמשים',
  insights: [
    {
      question: 'מה התפלגות התפקידים של המשתמשים?',
      generateGraph: () => {
        return (
          <PieChart
            series={[
              {
                data: [
                  { id: Role.Owner, value: 5, label: roleNames[Role.Owner] },
                  { id: Role.Admin, value: 10, label: roleNames[Role.Admin] },
                  { id: Role.Student, value: 20, label: roleNames[Role.Student] },
                  { id: Role.Pending, value: 15, label: roleNames[Role.Pending] },
                  { id: Role.PreEnrollment, value: 8, label: roleNames[Role.PreEnrollment] },
                  { id: Role.Rejected, value: 2, label: roleNames[Role.Rejected] },
                  { id: Role.deleted, value: 1, label: roleNames[Role.deleted] },
                  { id: Role.Unauthenticated, value: 30, label: roleNames[Role.Unauthenticated] }
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
      question: 'מה שיעור הפעילות של משתמשים לפי תפקיד?',
      generateGraph: () => {
        return (
          <BarChart
            series={[
              {
                data: [4, 8, 15],
                highlightScope: { faded: 'global', highlighted: 'item' }
              }
            ]}
            xAxis={[
              {
                scaleType: 'band',
                data: [roleNames[Role.Owner], roleNames[Role.Admin], roleNames[Role.Student], roleNames[Role.Pending]]
              }
            ]}
            height={200}
          />
        );
      }
    }
  ]
};

export default userInsights;
