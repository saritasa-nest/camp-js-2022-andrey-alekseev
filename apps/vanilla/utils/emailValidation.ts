// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validate email field using regex.
 * @param emailField - Email field.
 */
export function validateEmailField(emailField: HTMLInputElement): boolean {
  const isValid = validateEmail(emailField.value);
  if (isValid) {
    emailField.classList.add('valid');
    emailField.classList.remove('invalid');
  } else {
    emailField.classList.add('invalid');
    emailField.classList.remove('valid');
  }
  return isValid;
}

/**
 * Validate email string using regex.
 * @param email - Email string.
 */
export function validateEmail(email: string): boolean {
  return email.match(EMAIL_REGEX) !== null;
}
