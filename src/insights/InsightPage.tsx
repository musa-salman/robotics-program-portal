import { ReactNode, useState } from 'react';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import registerInsights from '../registers-management/RegisterInsights';
import userInsights from '../users/UserInsights';
import InsightCard from './InsightCard';
import studyMaterialInsights from '../study-material/StudyMaterialInsights';
import eventInsights from '../events/EventInsights';

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
        // <Box
        //   sx={{
        //     flexWrap:'wrap',
        //     backgroundColor: 'black', //FIXME:
        //     boxShadow: 20,
        //     borderRadius: 1,
        //     width:'100%',
        //     height:'100%',
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        //     outline: 'none'
        //   }}>
        <Typography
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: '6rem',
            outline: 'none'
          }}
          component="div">
          {children}
        </Typography>
        // </Box>
      )}
    </div>
  );
}

const InsightPage = () => {
  const insightsList: InsightCategoriesList = {
    insightCategories: [registerInsights, userInsights, studyMaterialInsights, eventInsights]
  };

  const [detailsCategory, setDetailsCategory] = useState<InsightData>({
    title: insightsList.insightCategories[0].title,
    insights: insightsList.insightCategories[0].insights
  });
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const updateTabValue = (_event: React.SyntheticEvent, newValue: number) => {
    console.log('newValue', newValue);
    setValue(newValue);
    setValue2(0);
    const exam: InsightData = {
      title: insightsList.insightCategories[newValue].title,
      insights: insightsList.insightCategories[newValue].insights
    };
    setDetailsCategory(exam);
    console.log(value);
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue2: number) => {
    setValue2(newValue2);
    console.log('value', value);
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: 24,
          width: '90%',
          height: '90%',
          borderRadius: 1,
          outline: 'none',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2%',
          padding: '20px'
        }}>
        <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={updateTabValue}
            variant="scrollable"
            scrollButtons={true}
            aria-label="scrollable prevent tabs example">
            {insightsList.insightCategories.map((category, index) => (
              <Tab label={category.title} key={index} sx={{ fontSize: '1.3rem' }} />
            ))}
          </Tabs>
        </Box>
        <Box
          sx={{
            bgcolor: 'GrayText',
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            padding: '20px'
          }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value2}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1 }}>
            {detailsCategory.insights.map((Item, index) => (
              <Tab
                label={Item.question}
                key={index}
                sx={{ fontSize: '1.3rem', margin: '20px', justifyContent: 'right' }}
              />
            ))}
          </Tabs>
          <div>
            {detailsCategory.insights.map(
              (item, idx) =>
                idx === value2 && (
                  <TabPanel value={value2} index={idx} key={value}>
                    <InsightCard {...item} />
                  </TabPanel>
                )
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export type { InsightData, InsightCategoriesList };
export default InsightPage;
