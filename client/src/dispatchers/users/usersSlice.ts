import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import {
  fetchBasicUsers,
  googleLogin,
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from './usersThunks';
import { toast } from 'react-toastify';

interface UsersState {
  user: User | null;
  users: User[];
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  fetchLoading: boolean;
  verifyEmailLoading: boolean;
  passwordForgetLoading: boolean;
  passwordForgetError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  users: [],
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fetchLoading: false,
  verifyEmailLoading: false,
  passwordForgetLoading: false,
  passwordForgetError: null,
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

    builder.addCase(forgotPassword.pending, (state) => {
      state.passwordForgetError = null;
      state.passwordForgetLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.passwordForgetError = null;
      state.passwordForgetLoading = false;
      toast.info(` Запрос на сброс пароля отправлен!`);
    });
    builder.addCase(forgotPassword.rejected, (state, { payload: error }) => {
      state.passwordForgetError = error || null;
      state.passwordForgetLoading = false;
      toast.error(error?.error);
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.passwordForgetError = null;
      state.passwordForgetLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.passwordForgetError = null;
      state.passwordForgetLoading = false;
      toast.success(`Новый пароль установлен!`);
    });
    builder.addCase(resetPassword.rejected, (state, { payload: error }) => {
      state.passwordForgetError = error || null;
      state.passwordForgetLoading = false;
      toast.error(error?.error);
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectVerifyEmailLoading = (state: RootState) =>
  state.users.verifyEmailLoading;
export const selectPasswordForgetError = (state: RootState) =>
  state.users.passwordForgetError;
export const selectPasswordForgetLoading = (state: RootState) =>
  state.users.passwordForgetLoading;
