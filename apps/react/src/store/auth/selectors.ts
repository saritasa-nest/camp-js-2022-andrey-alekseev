import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@js-camp/react/store';

/** Select user from store. */
export const selectUser = createSelector(
  (state: RootState) => state.auth.user,
  user => user,
);

/** Selects user loading state. */
export const selectIsUserLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Select login error from store. */
export const selectLoginError = createSelector(
  (state: RootState) => state.auth.loginError,
  loginError => loginError,
);

/** Select registration error from store. */
export const selectRegistrationError = createSelector(
  (state: RootState) => state.auth.registrationError,
  registrationError => registrationError,
);
