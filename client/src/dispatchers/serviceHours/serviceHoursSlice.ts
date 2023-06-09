import { GlobalError, ServiceHours } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createServiceHour,
  fetchOneServiceHours,
  fetchServiceHoursByUser,
  fetchServiceHoursForExpert,
  removeServiceHours,
  updateServiceHours,
} from './serviceHoursThunks';
import { toast } from 'react-toastify';

interface ServiceHoursState {
  datetimes: ServiceHours[];
  oneDateTime: ServiceHours | null;
  datetimeFetching: boolean;
  datetimeCreating: boolean;
  datetimeCreatingError: GlobalError | null;
  datetimeUpdating: boolean;
  datetimeUpdatingError: GlobalError | null;
  datetimeRemoving: string | false;
}

const initialState: ServiceHoursState = {
  datetimes: [],
  oneDateTime: null,
  datetimeFetching: false,
  datetimeCreating: false,
  datetimeCreatingError: null,
  datetimeUpdating: false,
  datetimeUpdatingError: null,
  datetimeRemoving: false,
};

export const serviceHoursSlice = createSlice({
  name: 'serviceHours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServiceHoursForExpert.pending, (state) => {
      state.datetimes = [];
      state.datetimeFetching = true;
    });
    builder.addCase(
      fetchServiceHoursForExpert.fulfilled,
      (state, { payload: datetimes }) => {
        state.datetimeFetching = false;
        state.datetimes = datetimes;
      },
    );
    builder.addCase(fetchServiceHoursForExpert.rejected, (state) => {
      state.datetimeFetching = false;
    });

    builder.addCase(fetchServiceHoursByUser.pending, (state) => {
      state.datetimes = [];
      state.datetimeFetching = true;
    });
    builder.addCase(
      fetchServiceHoursByUser.fulfilled,
      (state, { payload: datetimes }) => {
        state.datetimeFetching = false;
        state.datetimes = datetimes;
      },
    );
    builder.addCase(fetchServiceHoursByUser.rejected, (state) => {
      state.datetimeFetching = false;
    });

    builder.addCase(createServiceHour.pending, (state) => {
      state.datetimeCreatingError = null;
      state.datetimeCreating = true;
    });
    builder.addCase(createServiceHour.fulfilled, (state) => {
      state.datetimeCreatingError = null;
      state.datetimeCreating = false;
      toast.success('Рабочий график успешно создан!');
    });
    builder.addCase(createServiceHour.rejected, (state, { payload: error }) => {
      state.datetimeCreatingError = error || null;
      state.datetimeCreating = false;
      if (error) {
        toast.error(error.error);
      }
    });

    builder.addCase(fetchOneServiceHours.pending, (state) => {
      state.oneDateTime = null;
      state.datetimeFetching = true;
    });
    builder.addCase(
      fetchOneServiceHours.fulfilled,
      (state, { payload: datetime }) => {
        state.datetimeFetching = false;
        state.oneDateTime = datetime;
      },
    );
    builder.addCase(fetchOneServiceHours.rejected, (state) => {
      state.datetimeFetching = false;
    });

    builder.addCase(updateServiceHours.pending, (state) => {
      state.datetimeUpdatingError = null;
      state.datetimeUpdating = true;
    });
    builder.addCase(updateServiceHours.fulfilled, (state) => {
      state.datetimeUpdatingError = null;
      state.datetimeUpdating = false;
      toast.success('Рабочий график успешно обновлен!');
    });
    builder.addCase(
      updateServiceHours.rejected,
      (state, { payload: error }) => {
        state.datetimeUpdatingError = error || null;
        state.datetimeUpdating = false;
        if (error) {
          toast.error(error.error);
        }
      },
    );

    builder.addCase(
      removeServiceHours.pending,
      (state, { meta: { arg: id } }) => {
        state.datetimeRemoving = id;
      },
    );
    builder.addCase(removeServiceHours.fulfilled, (state) => {
      state.datetimeUpdatingError = null;
      state.datetimeRemoving = false;
      toast.success('Рабочий график успешно удален!');
    });
    builder.addCase(
      removeServiceHours.rejected,
      (state, { payload: error }) => {
        state.datetimeRemoving = false;
        if (error) {
          toast.error(error.error);
        }
      },
    );
  },
});

export const serviceHoursReducer = serviceHoursSlice.reducer;

export const selectDatetimes = (state: RootState) =>
  state.serviceHours.datetimes;
export const selectOneDatetime = (state: RootState) =>
  state.serviceHours.oneDateTime;
export const selectDatetimeFetching = (state: RootState) =>
  state.serviceHours.datetimeFetching;
export const selectDatetimeCreating = (state: RootState) =>
  state.serviceHours.datetimeCreating;
export const selectDatetimeCreatingError = (state: RootState) =>
  state.serviceHours.datetimeCreatingError;
export const selectDatetimeUpdating = (state: RootState) =>
  state.serviceHours.datetimeUpdating;
export const selectDatetimeUpdatingError = (state: RootState) =>
  state.serviceHours.datetimeUpdatingError;
export const selectDatetimeRemoving = (state: RootState) =>
  state.serviceHours.datetimeRemoving;
