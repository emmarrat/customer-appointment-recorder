import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectCategoryUpdating,
  selectCategoryUpdatingError,
  selectOneCategory,
} from '../../../../dispatchers/categories/categoriesSlice';
import { CategoryMutation } from '../../../../types';
import {
  fetchCategoryById,
  updateCategory,
} from '../../../../dispatchers/categories/categoriesThunks';
import CategoriesForm from '../../components/CategoriesForm/CategoriesForm';

const UpdateCategory = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectCategoryUpdatingError);
  const loading = useAppSelector(selectCategoryUpdating);
  const category = useAppSelector(selectOneCategory);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const submitUpdateCategory = async (category: CategoryMutation) => {
    await dispatch(updateCategory({ categoryMutation: category, id })).unwrap();
  };

  const exitingCategory = category && {
    title: category.title,
    image: null,
  };

  return (
    exitingCategory &&
    category && (
      <CategoriesForm
        onSubmit={submitUpdateCategory}
        loading={loading}
        error={error}
        isEdit={true}
        existingCategory={exitingCategory}
      />
    )
  );
};

export default UpdateCategory;
