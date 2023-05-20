import { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesThunks';
import { RootState } from '../../app/store';

interface CategoriesState {
  items: Category[];
  fetching: boolean;
}

const initialState: CategoriesState = {
  items: [],
  fetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetching = true;
      state.items = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
      state.fetching = false;
      state.items = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetching = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesFetching = (state: RootState) => state.categories.fetching;
