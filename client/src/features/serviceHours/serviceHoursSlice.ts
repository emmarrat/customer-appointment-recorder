import {GlobalError, ServiceHours} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchServiceHoursByUser, fetchServiceHoursForExpert} from "./serviceHoursThunks";

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
}

export const serviceHoursSlice = createSlice({
  name: 'serviceHours',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchServiceHoursForExpert.pending, (state) => {
      state.datetimes = []
      state.datetimeFetching = true;
    });
    builder.addCase(fetchServiceHoursForExpert.fulfilled, (state, {payload: datetimes}) => {
      state.datetimeFetching = false;
      state.datetimes = datetimes;
    });
    builder.addCase(fetchServiceHoursForExpert.rejected, (state) => {
      state.datetimeFetching = false;
    });

    builder.addCase(fetchServiceHoursByUser.pending, (state) => {
      state.datetimes = []
      state.datetimeFetching = true;
    });
    builder.addCase(fetchServiceHoursByUser.fulfilled, (state, {payload: datetimes}) => {
      state.datetimeFetching = false;
      state.datetimes = datetimes;
    });
    builder.addCase(fetchServiceHoursByUser.rejected, (state) => {
      state.datetimeFetching = false;
    });
  }
});

export const serviceHoursReducer = serviceHoursSlice.reducer;

export const selectDatetimes = (state: RootState) => state.serviceHours.datetimes;
export const selectOneDatetime = (state: RootState) => state.serviceHours.oneDateTime;
export const selectDatetimeFetching  = (state: RootState) => state.serviceHours.datetimeFetching;
export const selectDatetimeCreating  = (state: RootState) => state.serviceHours.datetimeCreating;
export const selectDatetimeCreatingError  = (state: RootState) => state.serviceHours.datetimeCreatingError;
export const selectDatetimeUpdating  = (state: RootState) => state.serviceHours.datetimeUpdating;
export const selectDatetimeUpdatingError  = (state: RootState) => state.serviceHours.datetimeUpdatingError;
export const selectDatetimeRemoving  = (state: RootState) => state.serviceHours.datetimeRemoving;
