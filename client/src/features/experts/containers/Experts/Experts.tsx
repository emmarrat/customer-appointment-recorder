import React, { useEffect } from 'react';
import { Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectExperts,
  selectExpertsFetching,
} from '../../../../dispatchers/experts/expertsSlice';
import {
  fetchExperts,
  fetchExpertsByCategory,
} from '../../../../dispatchers/experts/expertsThunks';
import ExpertCard from '../../components/ExpertCard/ExpertCard';
import { useParams } from 'react-router-dom';
import { selectCategoryName } from '../../../../dispatchers/categories/categoriesSlice';
import { motion } from 'framer-motion';

const Experts = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const experts = useAppSelector(selectExperts);
  const categoryName = useAppSelector(selectCategoryName);
  const loading = useAppSelector(selectExpertsFetching);

  useEffect(() => {
    if (id) {
      dispatch(fetchExpertsByCategory(id));
    } else {
      dispatch(fetchExperts());
    }
  }, [dispatch, id]);

  const teacherVariants = {
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.75,
      },
    }),
    hidden: {
      opacity: 0,
      scale: 0.1,
    },
  };

  return loading ? (
    <LinearProgress />
  ) : (
    <>
      <Typography
        textAlign="center"
        variant="h5"
        color="primary.main"
        fontWeight={700}
        mb={5}
      >
        {id && categoryName
          ? `Мастера по категории: ${categoryName}`
          : 'Список всех мастеров'}
      </Typography>
      <Grid
        container
        flexWrap="wrap"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        {experts.length > 0 ? (
          experts.map((expert, i) => (
            <Grid
              item
              container
              justifyContent="center"
              xs={12}
              sm={6}
              lg={4}
              key={expert._id}
            >
              <motion.div
                variants={teacherVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <ExpertCard expert={expert} />
              </motion.div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center" color="primary.main">
              Мастеров в данной категории пока нет :(
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Experts;
