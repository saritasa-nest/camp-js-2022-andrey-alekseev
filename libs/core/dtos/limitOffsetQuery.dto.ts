/** Limit offset query dto. */
export interface LimitOffsetQueryDto {

  /** Items per page. */
  readonly limit: number;

  /** Offset from zero. */
  readonly offset: number;

  /** Field to sort. */
  readonly ordering: string;
}
