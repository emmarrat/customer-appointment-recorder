import { Category, ValidationError } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from './categoriesThunks';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';

interface CategoriesState {
  items: Category[];
  item: Category | null;
  fetching: boolean;
  categoryName: string | null;
  creating: boolean;
  creatingError: ValidationError | null;
  removing: string | false;
  updating: boolean;
  updatingError: ValidationError | null;
}

const initialState: CategoriesState = {
  items: [],
  item: null,
  fetching: false,
  categoryName: null,
  creating: false,
  creatingError: null,
  removing: false,
  updating: false,
  updatingError: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoryName: (state, { payload: category }: PayloadAction<string>) => {
      state.categoryName = null;
      state.categoryName = category;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetching = true;
      state.items = [];
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, { payload: categories }) => {
        state.fetching = false;
        state.items = categories;
      },
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(fetchCategoryById.pending, (state) => {
      state.fetching = true;
      state.item = null;
    });
    builder.addCase(
      fetchCategoryById.fulfilled,
      (state, { payload: category }) => {
        state.fetching = false;
        state.item = category;
      },
    );
    builder.addCase(fetchCategoryById.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.creatingError = null;
      state.creating = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.creating = false;
      toast.info('Категория успешно создана!');
    });
    builder.addCase(createCategory.rejected, (state, { payload: error }) => {
      state.creatingError = error || null;
      state.creating = false;
      if (error) {
        toast.error(error.message);
      }
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.updatingError = null;
      state.updating = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.updating = false;
      toast.info('Категория успешно обновлена!');
    });
    builder.addCase(updateCategory.rejected, (state, { payload: error }) => {
      state.updatingError = error || null;
      state.updating = false;
      if (error) {
        toast.error(error.message);
      }
    });

    builder.addCase(deleteCategory.pending, (state, { meta: arg }) => {
      state.removing = arg.arg;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.removing = false;
      toast.info('Эксперт удален!');
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.removing = false;
      toast.error('При удалении возникла ошибка"');
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const { getCategoryName } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectOneCategory = (state: RootState) => state.categories.item;
export const selectCategoriesFetching = (state: RootState) =>
  state.categories.fetching;
export const selectCategoryName = (state: RootState) =>
  state.categories.categoryName;
export const selectCategoriesCreating = (state: RootState) =>
  state.categories.creating;

export const selectCategoryCreatingError = (state: RootState) =>
  state.categories.creatingError;

export const selectCategoriesRemoving = (state: RootState) =>
  state.categories.removing;
export const selectCategoryUpdating = (state: RootState) =>
  state.categories.updating;
export const selectCategoryUpdatingError = (state: RootState) =>
  state.categories.updatingError;
