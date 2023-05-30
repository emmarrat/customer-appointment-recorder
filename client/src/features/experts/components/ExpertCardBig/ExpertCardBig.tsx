import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { ExpertMini } from '../../../../types';
import { borderRadius } from '../../../../stylesMui';
import { apiURL } from '../../../../constants';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  expert: ExpertMini;
}
const ExpertCardBig: React.FC<Props> = ({ expert }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius,
        width: { xs: '100%', md: '550px' },
        marginX: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {expert.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {expert.user?.firstName} {expert.user?.lastName}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button
            variant="text"
            component={RouterLink}
            to={`/experts/${expert._id}`}
            sx={{ borderRadius }}
          >
            Открыть профиль
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 200, display: { xs: 'none', sm: 'unset' } }}
        image={apiURL + '/' + expert.photo}
        alt={`${expert.title} ${expert.user.firstName}`}
      />
    </Card>
  );
};

export default ExpertCardBig;
