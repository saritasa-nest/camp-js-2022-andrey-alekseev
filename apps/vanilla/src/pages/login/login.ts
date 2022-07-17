import M from 'materialize-css';

import { LoginData } from '@js-camp/core/models/user';

import { AuthService } from '../../api/services/authService';
import {
  validatePassword,
  validatePasswordField,
} from '../../../utils/passwordValidation';
import { AppUrl } from '../../../utils/constants';
import { ApiError } from '../../api/errors';
import {
  validateEmail,
  validateEmailField,
} from '../../../utils/emailValidation';
import { processFormChanged } from '../../../utils/formProcessing';
import { getElementOrRaiseError } from '../../../utils/query';
import { redirect } from '../../../utils/navigation';

document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();
  const loginForm = getElementOrRaiseError<HTMLFormElement>('.login-form');
  const passwordField = getElementOrRaiseError<HTMLInputElement>('#password');
  const emailField = getElementOrRaiseError<HTMLInputElement>('#email');

  loginForm.addEventListener('input', () => {
    processFormChanged(
      () => !validateEmail(emailField.value) || !validatePassword(passwordField.value),
    );
  });
  loginForm.addEventListener('submit', processSubmitForm);
  passwordField.addEventListener('input', () => validatePasswordField(passwordField));
  emailField.addEventListener('input', () => validateEmailField(emailField));
});

/**
 * Send request to login user.
 * @param loginData User login data.
 */
async function loginUser(loginData: LoginData): Promise<void> {
  const baseErrorBlock = getElementOrRaiseError<HTMLElement>('.base-error__text');
  try {
    await AuthService.login(loginData);
    redirect(AppUrl.Base);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      baseErrorBlock.innerText = error.message;
    } else {
      baseErrorBlock.innerText = 'Something went wrong';
    }
  }
}

/**
 * Process form on submit.
 * @param event Submit event.
 */
function processSubmitForm(event: SubmitEvent): void {
  event.preventDefault();
  const passwordField = getElementOrRaiseError<HTMLInputElement>('#password');
  const emailField = getElementOrRaiseError<HTMLInputElement>('#email');

  if (!validatePassword(passwordField.value) || !validateEmail(emailField.value)) {
    return;
  }

  loginUser({ email: emailField.value, password: passwordField.value });
}
