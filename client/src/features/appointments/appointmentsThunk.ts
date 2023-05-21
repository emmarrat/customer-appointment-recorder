import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment, AppointmentMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const createAppointment = createAsyncThunk<
  void,
  AppointmentMutation,
  { rejectValue: ValidationError }
>('appointments/create', async (appointment, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/appointments', appointment);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const fetchAppointments = createAsyncThunk<
  Appointment[],
  { params?: string; id?: string }
>('appointments/fetchAppointments', async (params) => {
  const response = await axiosApi.get(
    `/appointments${params && '?' + params.params + '=' + params.id}`,
  );
  const responseData = response.data;
  return responseData.appointments;
});
