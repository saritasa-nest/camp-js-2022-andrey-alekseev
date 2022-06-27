import M from 'materialize-css';

import { RegistrationData } from '@js-camp/core/models/user';

import { AuthService, RegisterErrorData, RegisterErrorField } from '../../api/services/authService';
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
import { getElementOrRaiseError } from '../../../utils/query';
import { processFormChanged } from '../../../utils/formProcessing';
import { redirect } from '../../../utils/navigation';

document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();
  const registrationForm = getElementOrRaiseError<HTMLFormElement>('.register-form');
  const passwordField = getElementOrRaiseError<HTMLInputElement>('#password');
  const emailField = getElementOrRaiseError<HTMLInputElement>('#email');

  registrationForm.addEventListener(
    'input',
    () => {
      processFormChanged(
        () => !validateEmail(emailField.value) || !validatePassword(passwordField.value),
      );
    },
  );
  registrationForm.addEventListener('submit', processSubmitForm);
  passwordField.addEventListener('input', () => validatePasswordField(passwordField));
  emailField.addEventListener('input', handleEmailInput);
});

/**
 * Process form on submit.
 * @param event Submit event.
 */
function processSubmitForm(event: SubmitEvent): void {
  event.preventDefault();
  const passwordField = getElementOrRaiseError<HTMLInputElement>('#password');
  const emailField = getElementOrRaiseError<HTMLInputElement>('#email');
  const firstNameField = getElementOrRaiseError<HTMLInputElement>('#first-name');
  const lastNameField = getElementOrRaiseError<HTMLInputElement>('#last-name');

  if (!validatePassword(passwordField.value) || !validateEmail(emailField.value)) {
    return;
  }

  registerUser({
    email: emailField.value,
    firstName: firstNameField.value,
    lastName: lastNameField.value,
    password: passwordField.value,
  });
}

/**
 * Send request to register user.
 * @param registrationForm User registration form.
 */
async function registerUser(registrationForm: RegistrationData): Promise<void> {
  const baseErrorText = getElementOrRaiseError<HTMLElement>('.base-error__text');

  try {
    await AuthService.register(registrationForm);
    redirect(AppUrl.Base);
  } catch (error: unknown) {
    if (!(error instanceof ApiError)) {
      baseErrorText.innerText = 'Something went wrong';
      return;
    }
    baseErrorText.innerText = error.message;

    const fieldsErrors = (error as ApiError<RegisterErrorData>).data.data;
    if (fieldsErrors === undefined) {
      return;
    }
    const emailError = fieldsErrors[RegisterErrorField.Email];
    if (emailError !== undefined) {
      const emailErrorBlock = getElementOrRaiseError<HTMLInputElement>(
        '#email-error',
      );
      emailErrorBlock.innerText = emailError[0];
      const emailField = getElementOrRaiseError('#email');
      emailField.classList.add('invalid');
    }
  }
}

/**
 * Remove email and base error on input.
 * @param event Input event.
 */
function handleEmailInput(event: Event): void {
  const emailField = event.target as HTMLInputElement;
  const emailError = getElementOrRaiseError<HTMLElement>('#email-error');

  if (validateEmailField(emailField)) {
    emailError.innerText = '';
  }
}
