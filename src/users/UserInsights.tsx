import { PieChart } from '@mui/x-charts';
import Role, { roleNames } from '../authentication/components/Roles';
import { InsightData } from '../insights/InsightPage';

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
                  { id: Role.Student, value: 20, label: roleNames[Role.Student] }
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

export default userInsights;
