import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectCategories,
  selectCategoriesFetching,
} from '../../../../dispatchers/categories/categoriesSlice';
import { fetchCategories } from '../../../../dispatchers/categories/categoriesThunks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import CategoriesCard from '../../components/CategoryCard/CategoriesCard';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Grid container justifyContent="center" mt={5}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Typography
            variant="h5"
            color="secondary.main"
            fontWeight={700}
            textAlign="center"
            mb={4}
          >
            Категории предоставляемых услуг:
          </Typography>
          <Grid container justifyContent="center" flexWrap="wrap" spacing={3}>
            {categories.map((category) => (
              <Grid item key={category._id}>
                <CategoriesCard category={category} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Categories;
