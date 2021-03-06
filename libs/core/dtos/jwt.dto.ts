/** JWT DTO. */
export interface JWTDto {

  /** Refresh token. */
  readonly refresh: string;

  /** Access token. */
  readonly access: string;

  /** DTO type. */
  readonly type: 'JWT';
}
