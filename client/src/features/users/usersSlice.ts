import {createSlice} from "@reduxjs/toolkit";
import {GlobalError, User, ValidationError} from "../../types";
import {RootState} from "../../app/store";

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
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
});


export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
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