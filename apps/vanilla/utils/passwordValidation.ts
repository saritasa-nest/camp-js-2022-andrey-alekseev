const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_SPECIAL_CHARACTERS = '()[\\]{}|`~!@#$%^&*_\\-+=;:\'",<>./?';

const LOWERCASE_REGEX = new RegExp(`[A-Z\\d${PASSWORD_SPECIAL_CHARACTERS}]`, 'g');
const UPPERCASE_REGEX = new RegExp(`[a-z\\d${PASSWORD_SPECIAL_CHARACTERS}]`, 'g');
const SPECIAL_SYMBOLS_REGEX = /[A-Za-z\d]/g;

/**
 *  Validate password by rules.
 *  @param passwordField Password field.
 * */
export function validatePasswordField(passwordField: HTMLInputElement): boolean {
  const { value } = passwordField;
  const listItemRuleMinLength = document.querySelector(
    '.password-rules__list-item[data-rule="min-length"]',
  );
  const listItemRuleCaseSymbols = document.querySelector(
    '.password-rules__list-item[data-rule="case-symbols"]',
  );
  const listItemRuleLettersNumbers = document.querySelector(
    '.password-rules__list-item[data-rule="letters-numbers"]',
  );
  const isLengthValid = validatePasswordLength(value);
  const isCaseSymbolsValid = validatePasswordCaseSymbols(value);
  const isNumbersLettersValid = validatePasswordLettersAndNumbers(value);

  if (listItemRuleMinLength !== null) {
    if (isLengthValid) {
      setSuccessPasswordRule(listItemRuleMinLength);
    } else {
      setErrorPasswordRule(listItemRuleMinLength);
    }
  }

  if (listItemRuleLettersNumbers !== null) {
    if (isNumbersLettersValid) {
      setSuccessPasswordRule(listItemRuleLettersNumbers);
    } else {
      setErrorPasswordRule(listItemRuleLettersNumbers);
    }
  }

  if (listItemRuleCaseSymbols !== null) {
    if (isCaseSymbolsValid) {
      setSuccessPasswordRule(listItemRuleCaseSymbols);
    } else {
      setErrorPasswordRule(listItemRuleCaseSymbols);
    }
  }

  const isValid = isLengthValid && isCaseSymbolsValid && isNumbersLettersValid;
  if (isValid) {
    passwordField.classList.add('valid');
    passwordField.classList.remove('invalid');
  } else {
    passwordField.classList.add('invalid');
    passwordField.classList.remove('valid');
  }
  return isValid;
}

/**
 * Validate password string by rules.
 * @param password Password string.
 */
export function validatePassword(password: string): boolean {
  const isLengthValid = validatePasswordLength(password);
  const isCaseValid = validatePasswordCaseSymbols(password);
  const isNumbersLettersValid = validatePasswordLettersAndNumbers(password);
  return isLengthValid && isCaseValid && isNumbersLettersValid;
}

/**
 * Validate password by length.
 * @param value Input value.
 */
function validatePasswordLength(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH;
}

/**
 * Validate password by case or symbols.
 * @param value Input value.
 */
function validatePasswordCaseSymbols(value: string): boolean {
  const numLower = value.replace(LOWERCASE_REGEX, '').length;
  const numUpper = value.replace(UPPERCASE_REGEX, '').length;
  const numSpecial = value.replace(SPECIAL_SYMBOLS_REGEX, '').length;
  return (
    (numUpper !== 0 && numLower !== 0) ||
    (numUpper !== 0 && numSpecial !== 0) ||
    (numLower !== 0 && numSpecial !== 0)
  );
}

/**
 * Validate password by case.
 * @param value Input value.
 */
function validatePasswordLettersAndNumbers(value: string): boolean {
  const numLetters = value.replace(/\D/g, '').length;
  const numNumbers = value.replace(/[^A-Za-z]/g, '').length;
  return numLetters !== 0 && numNumbers !== 0;
}

/**
 * Set success and remove error class.
 * @param element Password rule element.
 */
function setSuccessPasswordRule(element: Element): void {
  element.classList.remove('password-rules__list-item_error');
  element.classList.add('password-rules__list-item_success');
}

/**
 * Set error and remove success class.
 * @param element Password rule element.
 */
function setErrorPasswordRule(element: Element): void {
  element.classList.add('password-rules__list-item_error');
  element.classList.remove('password-rules__list-item_success');
}
