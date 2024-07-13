import { Grid } from "@mui/material";
import { ReactNode } from "react";

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

const InsightList : React.FC<InsightListProps> = ({list }) =>{
    return (
        <>  
            {(list || []).map((listItem, index) => (
              <Grid item xs={11.6} key={index} style={{ paddingTop: '1rem' }}>
                <listItem.Item {...listItem.props} />
              </Grid>
            ))}
        </>
    );
};
    
export default InsightList;