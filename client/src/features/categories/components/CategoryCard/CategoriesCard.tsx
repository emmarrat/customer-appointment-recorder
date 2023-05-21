import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Category } from '../../../../types';
import { apiURL } from '../../../../constants';
import { styles } from './CategoriesCardStyles';
import { useNavigate } from 'react-router-dom';

interface Props {
  category: Category;
}

const CategoriesCard: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();

  const pushToExperts = (categoryId: string) => {
    void navigate(`/experts/by-category/${categoryId}`);
  };
  return (
    <Card sx={styles.card} onClick={() => pushToExperts(category._id)}>
      <CardActionArea sx={styles.actionArea}>
        <CardMedia
          component="img"
          height="auto"
          image={`${apiURL}/${category.image}`}
          alt={category.title}
          className="media"
          sx={styles.media}
        />
        <CardContent sx={styles.content}>
          <Typography
            variant="h5"
            component="div"
            color="secondary.main"
            sx={styles.text}
          >
            {category.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoriesCard;
