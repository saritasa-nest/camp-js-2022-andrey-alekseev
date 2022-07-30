export type ValidationErrorDto<T> = {
  [key in keyof T]: string[]
} & {
  detail?: string;
};

/**
 * Get error message.
 * @param errors Validation errors.
 */
export function getErrorMessage(errors: string[] | undefined): string | undefined {
  if (errors === undefined) {
    return;
  }
  return errors[0];
}
