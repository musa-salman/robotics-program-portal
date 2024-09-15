import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

/**
 * Renders a skeleton event card component.
 *
 * @returns The skeleton event card component.
 */
const SkeletonEventCard = () => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardHeader
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton animation="wave" variant="rectangular" height={194} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SkeletonEventCard;
