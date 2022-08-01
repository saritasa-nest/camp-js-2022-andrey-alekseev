export type ValidationError<T> = {
  [key in keyof T]: string | undefined;
} & {
  detail?: string;
};

/** Base application error class. */
export class AppError extends Error {
  /** Error message. */
  public override readonly message: string;

  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}

/** Application validation error. */
export class AppValidationError<T> extends AppError {
  /** Validation errors. */
  public readonly validationErrors: ValidationError<T>;

  public constructor(message: string, validationData: ValidationError<T>) {
    super(message);
    this.validationErrors = validationData;
  }
}
