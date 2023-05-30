import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { ExpertMini } from '../../../../types';
import { apiURL } from '../../../../constants';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from './ExperdCardStyles';

interface Props {
  expert: ExpertMini;
}

const ExpertCard: React.FC<Props> = ({ expert }) => {
  return (
    <Card sx={styles.card}>
      <CardMedia
        className="media"
        sx={styles.media}
        image={apiURL + '/' + expert.photo}
        title={`${expert.title} ${expert.user.firstName}`}
      />
      <CardContent sx={styles.wrapper}>
        <Typography gutterBottom variant="h6" component="div">
          {expert.title}
        </Typography>
        <Typography variant="body1" component="div">
          {expert.user.firstName} {expert.user.lastName}
        </Typography>
      </CardContent>
      <CardActions sx={styles.wrapper}>
        <Button
          component={RouterLink}
          to={`/experts/${expert._id}`}
          variant="outlined"
          fullWidth
          sx={styles.btn}
        >
          Открыть профиль
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExpertCard;
