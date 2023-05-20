import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  ExpertFull,
  ExpertMini,
  ExpertMutation,
  Services,
  ValidationError,
} from '../../types';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

interface SearchParam {
  page?: number;
  limit?: number;
  user?: string;
}

export const createExpert = createAsyncThunk<
  void,
  ExpertMutation,
  { rejectValue: ValidationError }
>('experts/createExpert', async (expertData, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(expertData) as (keyof ExpertMutation)[];

  keys.forEach((key) => {
    const value: File | null | string | Services[] = expertData[key] as
      | File
      | string
      | null
      | Services[];
    if (value !== null) {
      if (key === 'services') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as File | string);
      }
    }
  });

  try {
    await axiosApi.post('/experts', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const fetchExperts = createAsyncThunk<
  ApiResponse<ExpertMini>,
  SearchParam | undefined
>('experts/fetchAll', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  const url = `/experts/${queryString ? `?${queryString}` : ''}`;
  const { data } = await axiosApi.get<ApiResponse<ExpertMini>>(url);
  return data;
});

export const fetchExpertById = createAsyncThunk<ExpertFull, string>(
  'experts/fetchExpertById',
  async (id) => {
    const response = await axiosApi.get(`/experts/${id}`);
    return response.data;
  },
);

export const updateExpert = createAsyncThunk<
  void,
  { id: string; expertData: ExpertMutation },
  {
    rejectValue: ValidationError;
    state: RootState;
  }
>('experts/updateExpert', async ({ id, expertData }, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(expertData) as (keyof ExpertMutation)[];

  keys.forEach((key) => {
    const value: File | null | string | Services[] = expertData[key] as
      | File
      | string
      | null
      | Services[];
    if (value !== null) {
      if (key === 'services') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as File | string);
      }
    }
  });

  try {
    await axiosApi.patch(`/experts/${id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});
