import { PieChart, PieValueType } from '@mui/x-charts';
import { InsightData } from '../insights/InsightPage';
import { useContext, useEffect, useState } from 'react';
import { RegisterContext } from '../register/service/RegisterContext';
import { hearAboutUsOptions } from '../register/info';

const registerInsightList: InsightData = {
  title: 'סטטיסטיקות נרשמים',
  insights: [
    {
      question: 'איך התלמידים מגיעים למגמה? בכמויות',
      generateGraph: () => {
        const registerService = useContext(RegisterContext);
        const [majorRegistrations, setMajorRegistrations] = useState<PieValueType[] | null>(null);

        useEffect(() => {
          if (majorRegistrations === null) {
            registerService.countMajorRegistrations().then((data) => {
              setMajorRegistrations(
                Object.entries(data).map(([key, value]) => ({
                  id: key,
                  value,
                  label: hearAboutUsOptions[parseInt(key)]
                }))
              );
            });
          }
        }, [registerService, majorRegistrations]);

        return (
          <PieChart
            series={[
              {
                data: majorRegistrations || [],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'black' }
              }
            ]}
            height={300}
          />
        );
      }
    }
    // {
    //   question: 'כמה יחידות לימוד במתמטיקה לומדים התלמידים? בכמויות',
    //   generateGraph: () => {
    //     const registerService = useContext(RegisterContext);
    //     const [studyUnitsRegistrations, setStudyUnitsRegistrations] = useState<PieValueType[] | null>(null);

    //     useEffect(() => {
    //       if (studyUnitsRegistrations === null) {
    //         registerService.collectMathUnitStatistics().then((data) => {
    //           setStudyUnitsRegistrations(Object.entries(data).map(([key, value]) => ({ id: key, value, label: key })));
    //         });
    //       }
    //     }, [registerService]);

    //     return (
    //       <PieChart
    //         series={[
    //           {
    //             data: studyUnitsRegistrations || [],
    //             highlightScope: { faded: 'global', highlighted: 'item' },
    //             faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
    //           }
    //         ]}
    //         height={200}
    //       />
    //     );
    //   }
    // },
    // {
    //   question: 'מה התלמידים מעדיפים ללמוד? בכמויות',
    //   generateGraph: () => {
    //     const registerService = useContext(RegisterContext);
    //     const [preferencesRegistrations, setPreferencesRegistrations] = useState<PieValueType[] | null>(null);

    //     useEffect(() => {
    //       if (preferencesRegistrations === null) {
    //         registerService.countMajorRegistrations().then((data) => {
    //           setPreferencesRegistrations(
    //             Object.entries(data).map(([key, value]) => ({
    //               id: key,
    //               value,
    //               label: studyUnitsMajorOptions[parseInt(key)]
    //             }))
    //           );
    //         });
    //       }
    //     }, [registerService]);

    //     return (
    //       <PieChart
    //         series={[
    //           {
    //             data: preferencesRegistrations || [],
    //             highlightScope: { faded: 'global', highlighted: 'item' },
    //             faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
    //           }
    //         ]}
    //         height={200}
    //       />
    //     );
    //   }
    // }
  ]
};

export default registerInsightList;
