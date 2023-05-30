import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCategories } from '../../../../dispatchers/categories/categoriesSlice';
import { fetchCategories } from '../../../../dispatchers/categories/categoriesThunks';
import { Grid, Typography } from '@mui/material';
import CategoriesCard from '../../components/CategoryCard/CategoriesCard';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
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
  );
};

export default Categories;
