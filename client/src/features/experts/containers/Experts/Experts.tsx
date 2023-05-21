import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectExperts } from '../../expertsSlice';
import { fetchExperts, fetchExpertsByCategory } from '../../expertsThunks';
import ExpertCard from '../../components/ExpertCard/ExpertCard';
import { useParams } from 'react-router-dom';
import { selectCategoryName } from '../../../categories/categoriesSlice';

const Experts = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const experts = useAppSelector(selectExperts);
  const categoryName = useAppSelector(selectCategoryName);

  useEffect(() => {
    if (id) {
      dispatch(fetchExpertsByCategory(id));
    } else {
      dispatch(fetchExperts());
    }
  }, [dispatch, id]);

  return (
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
      <Grid container justifyContent="center" spacing={2}>
        {experts.length > 0 &&
          experts.map((expert) => (
            <Grid
              item
              container
              justifyContent="center"
              flexWrap="wrap"
              xs={12}
              md={6}
              lg={4}
              key={expert._id}
            >
              <ExpertCard expert={expert} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Experts;
