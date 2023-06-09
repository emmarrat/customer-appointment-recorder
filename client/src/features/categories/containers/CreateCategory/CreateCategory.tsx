import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectCategoriesCreating,
  selectCategoryCreatingError,
} from '../../../../dispatchers/categories/categoriesSlice';
import { CategoryMutation } from '../../../../types';
import { createCategory } from '../../../../dispatchers/categories/categoriesThunks';
import CategoriesForm from '../../components/CategoriesForm/CategoriesForm';

const CreateCategory = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCategoriesCreating);
  const error = useAppSelector(selectCategoryCreatingError);

  const onSubmit = async (category: CategoryMutation) => {
    await dispatch(createCategory(category)).unwrap();
  };
  return <CategoriesForm onSubmit={onSubmit} loading={loading} error={error} />;
};

export default CreateCategory;
