import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  ServiceHourMutation,
  ServiceHours,
  UpdateHours,
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchServiceHoursForExpert = createAsyncThunk<
  ServiceHours[],
  string
>('serviceHours/fetchServiceHoursForExpert', async (expertId) => {
  const { data } = await axiosApi.get(`/service-hours/expert/${expertId}`);
  return data;
});

export const fetchServiceHoursByUser = createAsyncThunk<ServiceHours[], string>(
  'serviceHours/fetchServiceHoursByUser',
  async (id) => {
    const { data } = await axiosApi.get(`/service-hours/by-user/${id}`);
    return data;
  },
);

export const createServiceHour = createAsyncThunk<
  void,
  ServiceHourMutation,
  { rejectValue: GlobalError }
>('serviceHours/createServiceHour', async (body, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post(`/service-hours/`, body);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

export const fetchOneServiceHours = createAsyncThunk<ServiceHours, string>(
  'serviceHours/fetchOneServiceHours',
  async (id) => {
    const { data } = await axiosApi.get(`/service-hours/${id}`);
    return data;
  },
);

export const updateServiceHours = createAsyncThunk<
  void,
  UpdateHours,
  { rejectValue: GlobalError }
>(
  'serviceHours/updateServiceHours',
  async ({ id, hours }, { rejectWithValue }) => {
    try {
      await axiosApi.patch(`/service-hours/hours/${id}`, { hours });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  },
);

export const removeServiceHours = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('serviceHours/removeServiceHours', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/service-hours/${id}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});
