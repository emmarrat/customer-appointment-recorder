import { Appointment, IPagination, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAppointment, fetchAppointments } from './appointmentsThunk';
import { RootState } from '../../app/store';

interface AppointmentsState {
  appointments: Appointment[];
  oneAppointment: Appointment | null;
  appointmentCreating: boolean;
  appointmentCreatingError: ValidationError | null;
  appointmentFetching: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: AppointmentsState = {
  appointments: [],
  oneAppointment: null,
  appointmentCreating: false,
  appointmentCreatingError: null,
  appointmentFetching: false,
  currentPage: 1,
  totalCount: 1,
};

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAppointment.pending, (state) => {
      state.appointmentCreating = true;
      state.appointmentCreatingError = null;
    });
    builder.addCase(createAppointment.fulfilled, (state) => {
      state.appointmentCreating = false;
    });
    builder.addCase(createAppointment.rejected, (state, { payload: error }) => {
      state.appointmentCreating = false;
      state.appointmentCreatingError = error || null;
    });

    builder.addCase(fetchAppointments.pending, (state) => {
      state.appointmentFetching = true;
      state.appointments = [];
    });
    builder.addCase(fetchAppointments.fulfilled, (state, { payload }) => {
      state.appointmentFetching = false;
      const result = payload.result as IPagination<Appointment>;
      state.appointments = result.appointments;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchAppointments.rejected, (state) => {
      state.appointmentFetching = false;
    });
  },
});

export const appointmentsReducer = appointmentsSlice.reducer;

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectOneAppointment = (state: RootState) =>
  state.appointments.oneAppointment;
export const selectAppointmentCreating = (state: RootState) =>
  state.appointments.appointmentCreating;
export const selectAppointmentCreatingError = (state: RootState) =>
  state.appointments.appointmentCreatingError;
export const selectAppointmentFetching = (state: RootState) =>
  state.appointments.appointmentFetching;
export const selectAppointmentPage = (state: RootState) => state.appointments.currentPage;
export const selectAppointmentCount = (state: RootState) => state.appointments.totalCount;
