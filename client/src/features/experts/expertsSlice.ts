import { ExpertFull, ExpertMini, IPagination, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createExpert,
  fetchExpertById,
  fetchExpertByUser,
  fetchExperts,
  fetchExpertsByCategory,
  updateExpert,
} from './expertsThunks';

interface ExpertState {
  expert: ExpertFull | null;
  experts: ExpertMini[];
  expertCreating: boolean;
  expertCreatingError: ValidationError | null;
  fetchLoading: boolean;
  fetchOneExpertLoading: boolean;
  expertUpdating: boolean;
  expertUpdatingError: ValidationError | null;
  currentPage: number;
  totalCount: number;
}

const initialState: ExpertState = {
  expert: null,
  experts: [],
  expertCreating: false,
  expertCreatingError: null,
  fetchLoading: false,
  fetchOneExpertLoading: false,
  expertUpdating: false,
  expertUpdatingError: null,
  currentPage: 1,
  totalCount: 1,
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createExpert.pending, (state) => {
      state.expertCreatingError = null;
      state.expertCreating = true;
    });
    builder.addCase(createExpert.fulfilled, (state) => {
      state.expertCreating = false;
    });
    builder.addCase(createExpert.rejected, (state, { payload: error }) => {
      state.expertCreatingError = error || null;
      state.expertCreating = false;
    });

    builder.addCase(fetchExperts.pending, (state) => {
      state.experts = [];
      state.fetchLoading = true;
    });
    builder.addCase(fetchExperts.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<ExpertMini>;
      state.experts = result.experts;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchExperts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchExpertById.pending, (state) => {
      state.fetchOneExpertLoading = true;
      state.expert = null;
    });
    builder.addCase(fetchExpertById.fulfilled, (state, { payload: expert }) => {
      state.fetchOneExpertLoading = false;
      state.expert = expert;
    });
    builder.addCase(fetchExpertById.rejected, (state) => {
      state.fetchOneExpertLoading = false;
    });

    builder.addCase(fetchExpertsByCategory.pending, (state) => {
      state.fetchLoading = true;
      state.experts = [];
    });
    builder.addCase(fetchExpertsByCategory.fulfilled, (state, { payload: experts }) => {
      state.fetchLoading = false;
      state.experts = experts;
    });
    builder.addCase(fetchExpertsByCategory.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchExpertByUser.pending, (state) => {
      state.fetchOneExpertLoading = true;
      state.expert = null;
    });
    builder.addCase(fetchExpertByUser.fulfilled, (state, { payload: expert }) => {
      state.fetchOneExpertLoading = false;
      state.expert = expert;
    });
    builder.addCase(fetchExpertByUser.rejected, (state) => {
      state.fetchOneExpertLoading = false;
    });

    builder.addCase(updateExpert.pending, (state) => {
      state.expertUpdatingError = null;
      state.expertUpdating = true;
    });
    builder.addCase(updateExpert.fulfilled, (state) => {
      state.expertUpdating = false;
    });
    builder.addCase(updateExpert.rejected, (state, { payload: error }) => {
      state.expertUpdatingError = error || null;
      state.expertUpdating = false;
    });
  },
});

export const expertReducer = expertsSlice.reducer;
export const selectExperts = (state: RootState) => state.experts.experts;
export const selectOneExpert = (state: RootState) => state.experts.expert;
export const selectExpertCreating = (state: RootState) => state.experts.expertCreating;
export const selectExpertCreatingError = (state: RootState) =>
  state.experts.expertCreatingError;
export const selectExpertsFetching = (state: RootState) => state.experts.fetchLoading;
export const selectExpertOneFetching = (state: RootState) =>
  state.experts.fetchOneExpertLoading;
export const selectExpertUpdating = (state: RootState) => state.experts.expertUpdating;
export const selectExpertUpdatingError = (state: RootState) =>
  state.experts.expertUpdatingError;
export const selectExpertsCount = (state: RootState) => state.experts.totalCount;
export const selectExpertsPage = (state: RootState) => state.experts.currentPage;
