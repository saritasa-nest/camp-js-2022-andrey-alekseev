export interface S3DirectParamsBody {

  /** Destination bucket. */
  readonly dest: string;

  /** File name. */
  readonly filename: string;

  /** Content type. */
  readonly content_type: string;
}

export interface S3DirectUploadInfo {

  /** URL to upload. */
  readonly form_action: string;

  /** Configuration from API. */
  readonly [key: string]: string;
}
