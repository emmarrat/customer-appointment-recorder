import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  Appointment,
  AppointmentMutation,
  GlobalError,
  UpdateAppointmentParams,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

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

interface FetchAppointmentsParams {
  expert?: string;
  client?: string;
  page?: number;
  limit?: number;
}

export const fetchAppointments = createAsyncThunk<
  ApiResponse<Appointment>,
  FetchAppointmentsParams,
  { state: RootState }
>('appointments/fetchAppointments', async (params, thunkAPI) => {
  const { expert, client, page, limit } = params;
  const { getState } = thunkAPI;
  const userRole = getState().users.user?.role;

  const queryParams: string[] = [];

  if (expert && userRole === 'expert') {
    queryParams.push(`expert=${expert}`);
  } else if (client && userRole === 'user') {
    queryParams.push(`client=${client}`);
  }

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (limit) {
    queryParams.push(`limit=${limit}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  const response = await axiosApi.get(`/appointments${queryString}`);

  return response.data;
});

export const updateAppointment = createAsyncThunk<
  void,
  UpdateAppointmentParams,
  { rejectValue: GlobalError }
>(
  'appointments/updateStatus',
  async ({ id, isApproved }, { rejectWithValue }) => {
    try {
      await axiosApi.patch(`/appointments/${id}`, { isApproved });
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const remindAboutAppointment = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('appointments/remind', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.post(`/appointments/remind/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
