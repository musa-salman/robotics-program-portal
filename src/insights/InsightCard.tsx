import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface InsightCardProps {
  question: string;
  generateGraph: () => ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ question, generateGraph }) => {
  return (
    <Card>
      <CardContent
        sx={
          {
            // width:'100%',
            // height: '100%'
          }
        }>
        <Typography variant="h6">{question}</Typography>
        {generateGraph()}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
