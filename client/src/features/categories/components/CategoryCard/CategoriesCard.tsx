import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Category } from '../../../../types';
import { apiURL } from '../../../../constants';
import { styles } from './CategoriesCardStyles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { getCategoryName } from '../../../../dispatchers/categories/categoriesSlice';
import { motion } from 'framer-motion';

interface Props {
  category: Category;
}

const CategoriesCard: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pushToExperts = async (categoryId: string, categoryName: string) => {
    await dispatch(getCategoryName(categoryName));
    void navigate(`/experts/by-category/${categoryId}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{
        opacity: 1,
        scale: 1,
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
      transition={{ duration: 1.5 }}
    >
      <Card
        sx={styles.card}
        onClick={() => pushToExperts(category._id, category.title)}
      >
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
    </motion.div>
  );
};

export default CategoriesCard;
