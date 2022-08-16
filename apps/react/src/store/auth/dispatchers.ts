import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, RegistrationData } from '@js-camp/core/models/user';
import { User } from '@js-camp/core/models/user/user';
import { AppValidationError } from '@js-camp/core/models/appError';

import { UserService } from '../../api/services/userService';
import { AuthService } from '../../api/services/authService';

export const loginUser = createAsyncThunk<
  User,
  LoginData,
  {
    rejectValue: AppValidationError<LoginData>;
  }
>(
  'auth/login',
  async(loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(loginData);
      return response;
    } catch (error: unknown) {
      if (error instanceof AppValidationError) {
        return rejectWithValue(error);
      }
      throw error;
    }
  },
);

export const registerUser = createAsyncThunk<
  User,
  RegistrationData,
  {
    rejectValue: AppValidationError<RegistrationData>;
  }
>(
  'auth/registration',
  async(registrationData: RegistrationData, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(registrationData);
      return response;
    } catch (error: unknown) {
      if (error instanceof AppValidationError) {
        return rejectWithValue(error);
      }
      throw error;
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  AuthService.logout,
);

export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  UserService.getProfile,
);
