import { User } from '@js-camp/core/models/user/user';
import { AppValidationError } from '@js-camp/core/models/appError';
import { LoginData, RegistrationData } from '@js-camp/core/models/user';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Login error. */
  readonly loginError?: AppValidationError<LoginData>;

  /** Registration error. */
  readonly registrationError?: AppValidationError<RegistrationData>;

  /** User. */
  readonly user: User | null;
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
};
