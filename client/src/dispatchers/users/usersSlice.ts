import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import {
  fetchOneBasicUser,
  fetchBasicUsers,
  googleLogin,
  login,
  register,
  verifyEmail,
} from './usersThunks';
import { toast } from 'react-toastify';

interface UsersState {
  user: User | null;
  users: User[];
  oneBasicUser: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  fetchLoading: boolean;
  fetchOneUserLoading: boolean;
  verifyEmailLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  users: [],
  oneBasicUser: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fetchLoading: false,
  fetchOneUserLoading: false,
  verifyEmailLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerError = null;
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      toast.success(
        `${user.firstName}, регистрация прошла успешно! Теперь подтвердите email!`,
      );
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
      toast(`${user.firstName}, добро пожаловать!`, { icon: '👋' });
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
      toast.error(`${error?.error}`);
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.registerLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.user = user;
      toast(`${user.firstName}, добро пожаловать!`, { icon: '👋' });
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.loginError = error || null;
      toast.error(`${error?.error}`);
    });

    builder.addCase(fetchBasicUsers.pending, (state) => {
      state.fetchLoading = true;
      state.users = [];
    });
    builder.addCase(fetchBasicUsers.fulfilled, (state, { payload: users }) => {
      state.fetchLoading = false;
      state.users = users;
    });
    builder.addCase(fetchBasicUsers.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneBasicUser.pending, (state) => {
      state.fetchOneUserLoading = true;
      state.users = [];
    });
    builder.addCase(fetchOneBasicUser.fulfilled, (state, { payload: user }) => {
      state.fetchOneUserLoading = false;
      state.oneBasicUser = user;
    });
    builder.addCase(fetchOneBasicUser.rejected, (state) => {
      state.fetchOneUserLoading = false;
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.verifyEmailLoading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state, { payload: user }) => {
      state.verifyEmailLoading = false;
      state.user = user;
      toast.success(`${user.firstName}, ваш email успешно подтвержден!`);
    });
    builder.addCase(verifyEmail.rejected, (state) => {
      state.verifyEmailLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectOneBasicUser = (state: RootState) =>
  state.users.oneBasicUser;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectFetchingOneUser = (state: RootState) =>
  state.users.fetchOneUserLoading;
export const selectVerifyEmailLoading = (state: RootState) =>
  state.users.verifyEmailLoading;
