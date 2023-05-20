import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, ServiceHourMutation, ServiceHours } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchServiceHoursForExpert = createAsyncThunk<ServiceHours[], string>(
  'serviceHours/fetchServiceHoursForExpert',
  async (expertId) => {
    const response = await axiosApi.get(`/service-hours/expert/${expertId}`);
    return response.data;
  },
);

export const fetchServiceHoursByUser = createAsyncThunk<ServiceHours[], string>(
  'serviceHours/fetchServiceHoursByUser',
  async (id) => {
    const response = await axiosApi.get(`/service-hours/by-user/${id}`);
    return response.data;
  },
);

export const createServiceHour = createAsyncThunk<
  void,
  ServiceHourMutation,
  { rejectValue: GlobalError }
>('serviceHours/createServiceHour', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(`/service-hours/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});
