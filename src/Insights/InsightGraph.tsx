import { BarChart } from '@mui/x-charts';
import { ReactNode } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

const generateGraph: () => ReactNode = () => {
    return <BarChart
    series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
    ]}
    height={290}
    xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />;
  };
  
const generateGraph2: () => ReactNode = () => {
    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ];
    return <PieChart
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={200}
      />;
  };

  const generateGraph3: () => ReactNode = () => {
   
    return <LineChart
    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
    series={[
      {
        data: [2, 5.5, 2, 8.5, 1.5, 5],
      },
    ]}
    width={500}
    height={300}
  />;
  };

export { generateGraph,generateGraph2,generateGraph3};