import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface InsightCardProps {
  question: string;
  generateGraph: () => ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ question, generateGraph }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          // width:'100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <Typography variant="h3">{question}</Typography>
        {generateGraph()}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
