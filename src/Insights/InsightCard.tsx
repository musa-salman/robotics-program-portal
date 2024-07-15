import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface InsightCardProps {
  question: string;
  generateGraph: () => ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ question, generateGraph }) => {
  return (
    <>
      <Box>
        <h3>{question}</h3>
        {generateGraph()}
      </Box>
    </>
  );
};

export default InsightCard;
