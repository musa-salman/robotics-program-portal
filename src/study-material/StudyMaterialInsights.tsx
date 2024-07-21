import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { StudyMaterial } from './repository/StudyMaterial';
import { Category } from './repository/Category';
import { InsightData } from '../insights/InsightPage';
import { useEffect, useState } from 'react';
import { useMaterialService } from './repository/StudyMaterialContext';
import formatDate from '../utils/dateFormatter';

// const categories: Category[] = [
//   { id: '1', category: 'מתמטיקה' },
//   { id: '2', category: 'מדע' },
//   { id: '3', category: 'היסטוריה' }
// ];

// const studyMaterials: StudyMaterial[] = [
//   {
//     id: '1',
//     filename: 'algebra.pdf',
//     category: 'מתמטיקה',
//     title: 'יסודות האלגברה',
//     description: 'מבוא לאלגברה',
//     date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 5)
//   },
//   {
//     id: '2',
//     filename: 'biology.pdf',
//     category: 'מדע',
//     title: 'ביולוגיה 101',
//     description: 'מושגי ביולוגיה בסיסיים',
//     date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 3)
//   },
//   {
//     id: '3',
//     filename: 'world-history.pdf',
//     category: 'היסטוריה',
//     title: 'היסטוריה עולמית',
//     description: 'סקירה של היסטוריה עולמית',
//     date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 2)
//   },
//   {
//     id: '4',
//     filename: 'geometry.pdf',
//     category: 'מתמטיקה',
//     title: 'גיאומטריה לתלמידי חטיבה',
//     description: 'מבוא לגיאומטריה',
//     date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
//   },
//   {
//     id: '5',
//     filename: 'chemistry.pdf',
//     category: 'מדע',
//     title: 'כימיה לתלמידי תיכון',
//     description: 'מבוא לכימיה',
//     date: new Date()
//   },
//   {
//     id: '6',
//     filename: 'ancient-history.pdf',
//     category: 'היסטוריה',
//     title: 'היסטוריה עתיקה',
//     description: 'סקירה של ההיסטוריה העתיקה',
//     date: new Date()
//   }
// ];

interface CategoryInsights {
  category: Category;
  count: number;
}

const studyMaterialInsights: InsightData = {
  title: 'סטטיסטיקות חומרי לימוד',
  insights: [
    {
      question: 'איך מחולקים חומרי הלימוד לפי קטגוריות?',
      generateGraph: () => {
        const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
        const [categories, setCategories] = useState<Category[] | null>(null);
        const [categoryInsights, setCategoryInsights] = useState<{ id: string; value: number; label: string }[]>([]);
        const studyMaterialManagement = useMaterialService();
        useEffect(() => {
          if (categories === null) {
            studyMaterialManagement.categoryRepository
              .find()
              .then((data) => {
                setCategories(data);
              })
              .catch((error) => {
                console.log('error while git categories');
              });
          }
          if (studyMaterials === null) {
            studyMaterialManagement.studyMaterialRepository
              .find()
              .then((data) => {
                setStudyMaterials(data);
              })
              .catch((error) => {
                console.log('error while git studyMaterial');
              });
          }
          if (studyMaterials !== null && categories !== null) {
            const categoryInsightsArray = categories.map((category) => {
              return {
                category: category,
                count: studyMaterials.filter((material) => material.category === category.category).length
              };
            });
            const categoryCount = categoryInsightsArray.map((index) => ({
              id: index.category.id,
              value: index.count,
              label: index.category.category
            }));
            setCategoryInsights(categoryCount);
            console.log('ca', categoryCount);
          }
        }, [categories, studyMaterials]);
        if (categories === null || studyMaterials === null) {
          return <div>Loading...</div>;
        }
        return (
          <>
            <PieChart
              series={[
                {
                  data: categoryInsights,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'black' }
                }
              ]}
              height={300}
            />
          </>
        );
      }
    }
    // {
    //   question: 'כיצד השתנו ההוספות של חומרי לימוד לאורך זמן?',
    //   generateGraph: () => {
    //     const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[] | null>(null);
    //     const [categories, setCategories] = useState<Category[] | null>(null);
    //     const [studyMaterialCountByDate, setStudyMaterialCountByDate] = useState<Record<string, number>>();
    //     const studyMaterialManagement = useMaterialService();

    //     useEffect(() => {
    //       if (studyMaterials === null) {
    //         studyMaterialManagement.studyMaterialRepository
    //           .find()
    //           .then((data) => {
    //             setStudyMaterials(data);
    //           })
    //           .catch((error) => {
    //             console.log('error while git studyMaterial');
    //           });
    //       }
    //       if (studyMaterials !== null) {
    //         const studyMaterialCount = studyMaterials.reduce(
    //           (acc, material) => {
    //             const date = new Date(material.date);
    //             const year = date.getUTCFullYear();
    //             const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    //             const day = String(date.getUTCDate()).padStart(2, '0');
    //             const formattedDate = `${year}-${month}-${day}`;
    //             console.log(formatDate);
    //             acc[formattedDate] = acc[formattedDate] ? acc[formattedDate] + 1 : 1;
    //             return acc;
    //           },
    //           {} as Record<string, number>
    //         );
    //         setStudyMaterialCountByDate(studyMaterialCount);
    //       }
    //     }, [studyMaterials]);
    //     if (studyMaterials === null) {
    //       return <div>Loading...</div>;
    //     }

    //     console.log('f', studyMaterialCountByDate);
    //     return (
    //       <>
    //         {studyMaterialCountByDate !== undefined && (
    //           <LineChart
    //             xAxis={[
    //               {
    //                 data: Object.keys(studyMaterialCountByDate),
    //                 label: 'תאריך',
    //                 axisId: 'x',
    //                 scaleType: 'time'
    //               }
    //             ]}
    //             series={[
    //               {
    //                 data: Object.entries(studyMaterialCountByDate).map(([_, count]) => count),
    //                 label: 'הוספות חומרי לימוד'
    //               }
    //             ]}
    //             height={200}
    //           />
    //         )}
    //       </>
    //     );
    //   }
    // }
    // {
    //   question: 'כמות חומרי הלימוד בכל קטגוריה?',
    //   generateGraph: () => {
    //     const studyMaterialCountByCategory = categories.map((category) => ({
    //       id: category.id,
    //       value: studyMaterials.filter((material) => material.category === category.category).length,
    //       label: category.category
    //     }));

    //     return (
    //       <BarChart
    //         xAxis={[
    //           {
    //             data: studyMaterialCountByCategory.map((item) => item.label),
    //             label: 'קטגוריה',
    //             scaleType: 'band',
    //             axisId: 'x'
    //           }
    //         ]}
    //         series={[
    //           {
    //             data: studyMaterialCountByCategory.map((item) => item.value),
    //             label: 'כמות חומרי הלימוד'
    //           }
    //         ]}
    //         height={200}
    //       />
    //     );
    //   }
    // }
  ]
};

export default studyMaterialInsights;
