import React, { useEffect } from 'react';
import CategoriesTable from '../../components/CategoriesTable/CategoriesTable';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectCategories,
  selectCategoriesFetching,
} from '../../../../dispatchers/categories/categoriesSlice';
import { fetchCategories } from '../../../../dispatchers/categories/categoriesThunks';
import { Grid, LinearProgress } from '@mui/material';

const CategoriesAdmin = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Grid>
      {loading ? (
        <LinearProgress />
      ) : (
        <CategoriesTable categories={categories} />
      )}
    </Grid>
  );
};

export default CategoriesAdmin;
