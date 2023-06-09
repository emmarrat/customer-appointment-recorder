import { Appointment, IPagination } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createAppointment,
  fetchAppointments,
  remindAboutAppointment,
  updateAppointment,
} from './appointmentsThunk';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';

interface AppointmentsState {
  appointments: Appointment[];
  appointmentCreating: boolean;
  appointmentFetching: boolean;
  appointmentUpdating: string | false;
  currentPage: number;
  totalCount: number;
  appointmentsReminderLoading: string | false;
}

const initialState: AppointmentsState = {
  appointments: [],
  appointmentCreating: false,
  appointmentFetching: false,
  appointmentUpdating: false,
  currentPage: 1,
  totalCount: 1,
  appointmentsReminderLoading: false,
};

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAppointment.pending, (state) => {
      state.appointmentCreating = true;
    });
    builder.addCase(createAppointment.fulfilled, (state) => {
      state.appointmentCreating = false;
      toast.info('Запись отправлена на рассмотрение');
    });
    builder.addCase(createAppointment.rejected, (state, { payload: error }) => {
      state.appointmentCreating = false;
      if (error) {
        toast.error(error.message);
      }
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

    builder.addCase(updateAppointment.pending, (state, { meta: { arg } }) => {
      state.appointmentUpdating = arg.id;
    });
    builder.addCase(updateAppointment.fulfilled, (state) => {
      state.appointmentUpdating = false;
      toast.info('Статус записи обновлен!');
    });
    builder.addCase(updateAppointment.rejected, (state, { payload: error }) => {
      state.appointmentUpdating = false;
      if (error) {
        toast.error(error.error);
      }
    });
    builder.addCase(
      remindAboutAppointment.pending,
      (state, { meta: { arg } }) => {
        state.appointmentsReminderLoading = arg;
      },
    );
    builder.addCase(remindAboutAppointment.fulfilled, (state) => {
      state.appointmentsReminderLoading = false;
      toast.info('Напоминание отправлено!');
    });
    builder.addCase(
      remindAboutAppointment.rejected,
      (state, { payload: error }) => {
        state.appointmentsReminderLoading = false;
        if (error) {
          toast.error(error.error);
        }
      },
    );
  },
});

export const appointmentsReducer = appointmentsSlice.reducer;

export const selectAppointments = (state: RootState) =>
  state.appointments.appointments;
export const selectAppointmentCreating = (state: RootState) =>
  state.appointments.appointmentCreating;
export const selectAppointmentFetching = (state: RootState) =>
  state.appointments.appointmentFetching;
export const selectAppointmentUpdating = (state: RootState) =>
  state.appointments.appointmentUpdating;
export const selectAppointmentReminderLoading = (state: RootState) =>
  state.appointments.appointmentsReminderLoading;
export const selectAppointmentPage = (state: RootState) =>
  state.appointments.currentPage;
export const selectAppointmentCount = (state: RootState) =>
  state.appointments.totalCount;
