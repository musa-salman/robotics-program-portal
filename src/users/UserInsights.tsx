import { PieChart } from '@mui/x-charts';
import Role, { roleNames } from '../authentication/components/Roles';
import { InsightData } from '../insights/InsightPage';
import { useEffect, useState } from 'react';
import { User } from './User';
import { useUserService } from './useUserService';

const userInsights: InsightData = {
  title: 'סטטיסטיקות משתמשים',
  insights: [
    {
      question: 'מה התפלגות התפקידים של המשתמשים?',
      generateGraph: () => {
        const [numRoleOwner, setNumRoleOwner] = useState(0);
        const [numRoleAdmin, setNumRoleAdmin] = useState(0);
        const [numRoleStudent, setNumRoleStudent] = useState(0);
        const [users, setUsers] = useState<User[] | null>(null);

        const userService = useUserService();
        useEffect(() => {
          if (users === null) {
            userService.getUsers().then((data) => {
              setUsers(data);

              let numOwner: number = 0;
              let numAdmin: number = 0;
              let numStudent: number = 0;
              data.forEach((index) => {
                index.roles.forEach((role) => {
                  if (role === Role.Owner) numOwner++;
                  if (role === Role.Admin) numAdmin++;
                  if (role === Role.Student) numStudent++;
                });
              });
              setNumRoleOwner(numOwner);
              setNumRoleAdmin(numAdmin);
              setNumRoleStudent(numStudent);
            });
          }
        }, [users]);
        if (users === null) {
          <div>Loading...</div>;
        }

        return (
          <PieChart
            series={[
              {
                data: [
                  { id: Role.Owner, value: numRoleOwner, label: roleNames[Role.Owner] },
                  { id: Role.Admin, value: numRoleAdmin, label: roleNames[Role.Admin] },
                  { id: Role.Student, value: numRoleStudent, label: roleNames[Role.Student] }
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
              }
            ]}
            height={300}
          />
        );
      }
    }
  ]
};

export default userInsights;
