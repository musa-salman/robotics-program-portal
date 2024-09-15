import { PieChart } from '@mui/x-charts';
import { StudyMaterial } from './repository/StudyMaterial';
import { Category } from './repository/Category';
import { InsightData } from '../insights/InsightPage';
import { useEffect, useState } from 'react';
import { useMaterialService } from './repository/StudyMaterialContext';

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
              .catch(() => {
                console.log('error while git categories');
              });
          }
          if (studyMaterials === null) {
            studyMaterialManagement.studyMaterialRepository
              .find()
              .then((data) => {
                setStudyMaterials(data);
              })
              .catch(() => {
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
