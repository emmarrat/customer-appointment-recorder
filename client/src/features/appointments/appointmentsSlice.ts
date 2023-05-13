import {Appointment, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAppointment} from "./appointmentsThunk";
import {RootState} from "../../app/store";

interface AppointmentsState {
  appointments: Appointment[];
  oneAppointment: Appointment | null;
  appointmentCreating: boolean;
  appointmentCreatingError: ValidationError | null;
  appointmentFetching: boolean;
}

const initialState: AppointmentsState = {
  appointments: [],
  oneAppointment: null,
  appointmentCreating: false,
  appointmentCreatingError: null,
  appointmentFetching:false,
};

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createAppointment.pending, (state) => {
      state.appointmentCreating = true;
      state.appointmentCreatingError = null;
    });
    builder.addCase(createAppointment.fulfilled, (state) => {
      state.appointmentCreating = false;
    });
    builder.addCase(createAppointment.rejected, (state,  {payload: error}) => {
      state.appointmentCreating = false;
      state.appointmentCreatingError = error || null;
    });
  }
});

export const appointmentsReducer = appointmentsSlice.reducer;

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectOneAppointment = (state: RootState) => state.appointments.oneAppointment;
export const selectAppointmentCreating  = (state: RootState) => state.appointments.appointmentCreating;
export const selectAppointmentCreatingError  = (state: RootState) => state.appointments.appointmentCreatingError;
export const selectAppointmentFetching  = (state: RootState) => state.appointments.appointmentFetching;
