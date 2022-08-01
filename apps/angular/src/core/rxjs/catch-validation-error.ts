import { catchError, ObservedValueOf, OperatorFunction } from 'rxjs';

import { AppValidationError } from '../models/app-errors';

/**
 * Catch only validation error.
 * @param selector Processing function.
 */
export function catchValidationError<T, TReturn extends ObservedValueOf<unknown>, TModel>(
  selector: (error: AppValidationError<TModel>) => TReturn,
): OperatorFunction<T, T | ObservedValueOf<TReturn>> {
  return catchError((error: unknown) => {

    if (error instanceof AppValidationError) {
      return selector(error);
    }
    throw error;
  });
}
