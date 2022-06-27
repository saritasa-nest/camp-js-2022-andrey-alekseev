import { getElementOrRaiseError } from './query';

/**
 * Disable submit button before fields are valid.
 * Also clear errors block on change.
 * @param validationCallBack Function that should return boolean that shows if the form is valid.
 */
export function processFormChanged(
  validationCallBack: () => boolean,
): void {
  const errorsTextElement = getElementOrRaiseError<HTMLElement>('.base-error__text');
  const submitButton = getElementOrRaiseError<HTMLButtonElement>('.submit-button');

  errorsTextElement.innerText = '';
  submitButton.disabled = validationCallBack();
}
