import { AxiosError } from 'axios';

/** Response error. */
export interface ResponseError<T> {

  /** String with error detail. */
  readonly detail: string;

  /** Error data. */
  readonly data?: T;
}

/** Custom Api error. */
export class ApiError<T> extends Error {

  /** Api error status. */
  public readonly status: number;

  /** Error data. */
  public readonly data: ResponseError<T>;

  public constructor(axiosError: AxiosError<ResponseError<T>>) {
    const { response } = axiosError;
    if (response === undefined) {
      throw new Error('Axios error has no response');
    }
    super(response.data.detail);
    this.data = response.data;
    this.status = response.status;
    this.name = 'ApiError';
  }

}
