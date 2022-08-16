import { createSlice } from '@reduxjs/toolkit';

import { getUserProfile, loginUser, logoutUser, registerUser } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginError(state) {
      state.loginError = undefined;
    },
    clearRegistrationError(state) {
      state.registrationError = undefined;
    },
  },
  extraReducers: builder => builder
    .addCase(loginUser.pending, state => {
      state.isLoading = true;
      state.loginError = undefined;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loginError = action.payload;
      state.isLoading = false;
    })
    .addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.registrationError = undefined;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.registrationError = action.payload;
      state.isLoading = false;
    })
    .addCase(logoutUser.fulfilled, state => {
      state.user = null;
    })
    .addCase(getUserProfile.pending, state => {
      state.isLoading = true;
    })
    .addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(getUserProfile.rejected, state => {
      state.isLoading = false;
    }),
});

export const { clearLoginError, clearRegistrationError } = authSlice.actions;
