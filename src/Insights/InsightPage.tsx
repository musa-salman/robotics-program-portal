import { ReactNode, useState } from 'react';
import InsightCard from './InsightCard';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import registerInsightList from '../registers-management/RegisterInsights';
import userInsights from '../users/UserInsights';

interface InsightCardProps {
  question: string;
  generateGraph: () => ReactNode;
}

interface InsightData {
  title: string;
  insights: InsightCardProps[];
}

interface InsightCategoriesList {
  insightCategories: InsightData[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            height: 500,
            // boxShadow: 24,
            width: '60rem',
            // borderRadius: 1,
            outline: 'none'
            // backgroundColor:"black"
          }}>
          <Typography
            sx={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: 500,
              // boxShadow: 24,
              width: '50rem',
              // borderRadius: 1,
              outline: 'none'
              // backgroundColor:"white"
            }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

const InsightPage = () => {
  const insightsList: InsightCategoriesList = {
    insightCategories: [registerInsightList, userInsights]
  };

  const [detailsCategory, setDetailsCategory] = useState<InsightData>({
    title: insightsList.insightCategories[0].title,
    insights: insightsList.insightCategories[0].insights
  });
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const updateTabValue = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const exam: InsightData = {
      title: insightsList.insightCategories[value].title,
      insights: insightsList.insightCategories[value].insights
    };
    setDetailsCategory(exam);
    console.log(value);
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue2: number) => {
    setValue2(newValue2);
    console.log(value2);
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '53%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          width: '90rem',
          borderRadius: 1,
          outline: 'none'
        }}>
        <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={updateTabValue}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example">
            {insightsList.insightCategories.map((category, index) => (
              <Tab label={category.title} key={index} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ bgcolor: 'background.paper', display: 'flex', height: 600 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value2}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1 }}>
            {detailsCategory.insights.map((Item, index) => (
              <Tab label={Item.question} key={index} />
            ))}
          </Tabs>
          {detailsCategory.insights.map(
            (item, idx) =>
              idx === value2 && (
                <TabPanel value={value2} index={idx}>
                  <InsightCard key={value2} {...item} />
                </TabPanel>
              )
          )}
        </Box>
      </Box>
    </>
  );
};

export type { InsightData, InsightCategoriesList };
export default InsightPage;
