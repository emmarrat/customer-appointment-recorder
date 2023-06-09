import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category, CategoryMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const { data } = await axiosApi.get<Category[]>('/categories');
    return data;
  },
);

export const fetchCategoryById = createAsyncThunk<Category, string>(
  'categories/fetchOne',
  async (id) => {
    const { data } = await axiosApi.get<Category>(`/categories/${id}`);
    return data;
  },
);

export const createCategory = createAsyncThunk<
  void,
  CategoryMutation,
  { rejectValue: ValidationError }
>('categories/create', async (categoryMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(categoryMutation) as (keyof CategoryMutation)[];

    keys.forEach((key) => {
      const value = categoryMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/categories', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface CategoryUpdate {
  id: string;
  categoryMutation: CategoryMutation;
}

export const updateCategory = createAsyncThunk<
  void,
  CategoryUpdate,
  { rejectValue: ValidationError }
>(
  'categories/update',
  async ({ categoryMutation, id }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(categoryMutation) as (keyof CategoryMutation)[];

      keys.forEach((key) => {
        const value = categoryMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.put(`/categories/${id}`, formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const deleteCategory = createAsyncThunk<void, string>(
  'categories/remove',
  async (categoryId) => {
    await axiosApi.delete(`/categories/${categoryId}`);
  },
);
