import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  ResetPassword,
  User,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post<RegisterResponse>('/users', formData);
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
    );
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const logout = createAsyncThunk(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(unsetUser());
  },
);

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<RegisterResponse>('/users/google', {
      credential,
    });
    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const fetchBasicUsers = createAsyncThunk<User[]>(
  'users/fetchAllBasic',
  async () => {
    const { data } = await axiosApi.get<User[]>('/users/basics');
    return data;
  },
);

export const fetchOneBasicUser = createAsyncThunk<User, string>(
  'users/fetchOneBasicUser',
  async (id) => {
    const { data } = await axiosApi.get<User>('/users/basic/' + id);
    return data;
  },
);

export const verifyEmail = createAsyncThunk<User, string>(
  'users/verifyEmail',
  async (token) => {
    const { data } = await axiosApi.post<RegisterResponse>(
      `/users/verify-email/${token}`,
    );
    return data.user;
  },
);

interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = createAsyncThunk<
  void,
  ForgotPasswordPayload,
  { rejectValue: GlobalError }
>('users/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    await axiosApi.post('/users/forgot-password', email);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

export const resetPassword = createAsyncThunk<
  void,
  ResetPassword,
  { rejectValue: GlobalError }
>('users/resetPassword', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(
      `/users/reset-password/${data.token}`,
      {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});
