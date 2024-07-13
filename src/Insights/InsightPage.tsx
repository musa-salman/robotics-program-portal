import { FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import { ReactNode, useState } from 'react';
import InsightCard from './InsightCard';
import { generateGraph, generateGraph2, generateGraph3 } from './InsightGraph';
import InsightList from './InsightList';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface InsightCardProps {
  question:string;
  generateGraph: ()=> ReactNode;
}

interface InsightListItem {
  
  Item :React.FC<InsightCardProps>;
  props: InsightCardProps;
}

interface InsightListProps {
  list: InsightListItem[];
}

interface InsightCategoryItem {
    
  insightCategory :string;
  insightCategoryList:InsightListItem[];
    
}

interface InsightCategoriesList {
    
  insightCategories :InsightCategoryItem[];
  
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
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          position: 'absolute',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            height: 500,
            // boxShadow: 24,
            width: '60rem',
            // borderRadius: 1,
            outline: 'none',
            // backgroundColor:"black"
        }}>
          <Typography sx={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: 500,
            // boxShadow: 24,
            width: '50rem',
            // borderRadius: 1,
            outline: 'none',
            // backgroundColor:"white"
            }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



const InsightPage = () =>{


  const exampleList: InsightListProps = {
    list: [
      { Item: InsightCard, props: { question: 'What is your favorite color?', generateGraph:generateGraph } },
      { Item: InsightCard, props: { question: 'How often do you exercise?', generateGraph:generateGraph2 }},
      { Item: InsightCard, props: { question: 'How often do you exercise?', generateGraph:generateGraph3 }},
    ],
  };
  
  const exampleList1: InsightListProps = {
    list: [
      { Item: InsightCard, props: { question: 'What is your favorite color1?', generateGraph:generateGraph2 } },
      { Item: InsightCard, props: { question: 'How often do you exercise1?', generateGraph:generateGraph2 }},
      { Item: InsightCard, props: { question: 'How often do you exercise1?', generateGraph:generateGraph2 }},
    ],
  };

  const exampleList2: InsightListProps = {
    list: [
      { Item: InsightCard, props: { question: 'What is your favorite color2?', generateGraph:generateGraph } },
      { Item: InsightCard, props: { question: 'How often do you exercise2?', generateGraph:generateGraph }},
      { Item: InsightCard, props: { question: 'How often do you exercise2?', generateGraph:generateGraph }},
    ],
  };

  const exampleCategoriesList: InsightCategoriesList = {
    insightCategories: [
      {
        insightCategory: "נרשמים",
        insightCategoryList: [...exampleList.list],
      },
      {
        insightCategory: 'Category 2',
        insightCategoryList: [...exampleList1.list],
      },
      {
        insightCategory: 'Category 3',
        insightCategoryList: [...exampleList2.list],
      },
    ],
  };

  const [detailsCategory,setDetailsCategory] =useState<InsightCategoryItem>({
    insightCategory :exampleCategoriesList.insightCategories[0].insightCategory,
    insightCategoryList:exampleCategoriesList.insightCategories[0].insightCategoryList,
  });
  const [value, setValue] =useState(0);
  const [value2, setValue2] = useState(0);

  const handleChangeTabe1 = (event: React.SyntheticEvent, newValue: number) => {
    
      setValue(newValue);
    const exam :InsightCategoryItem ={
      insightCategory:exampleCategoriesList.insightCategories[value].insightCategory,
      insightCategoryList:exampleCategoriesList.insightCategories[value].insightCategoryList,
    };
    setDetailsCategory(exam);
    console.log(value);
    
  };
  const handleChangeTabe2 = (event: React.SyntheticEvent, newValue2: number) => {
    setValue2(newValue2);
    console.log(value2);
  };

  
 
  return (
    <>

      <Box sx={{ 
        position: 'absolute',
        top: '53%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        width: '90rem',
        borderRadius: 1,
        outline: 'none'
        }}
      >
      <Box sx={{  p:2 ,  bgcolor: 'background.paper',display: 'flex', justifyContent: 'center'}}>
      <Tabs
          value={value}
          onChange={handleChangeTabe1}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
        {exampleCategoriesList.insightCategories.map((category, index) => (
          <Tab label={category.insightCategory} key={index} />
        ))}
          
        </Tabs>
        </Box>
        <Box
          sx={{  bgcolor: 'background.paper', display: 'flex', height: 600}}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value2}
            onChange={handleChangeTabe2}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1}}
          >
            {detailsCategory.insightCategoryList.map((Item,index) => (
              <Tab label={Item.props.question} key={index}/>
            ))}

          </Tabs>
          {detailsCategory.insightCategoryList.map((item,idx) => (
            
            idx === value2 &&
            <TabPanel value={value2} index={idx}>
             <item.Item key={value2} {...item.props} />
            </TabPanel>
          ))}

        </Box>
        
      </Box>
    </>
  );
};
  
  export default InsightPage;