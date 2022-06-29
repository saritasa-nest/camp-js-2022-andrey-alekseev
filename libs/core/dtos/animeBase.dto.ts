/** Aired dto. */
export interface AiredDto {

  /** Aired start date. */
  readonly start: string;

  /** Aired end date. */
  readonly end: string;
}

/** Anime base dto. */
export interface AnimeBaseDto {

  /** Id. */
  readonly id: number;

  /** English title. */
  readonly title_eng: string;

  /** Japan title. */
  readonly title_jpn: string;

  /** Image. */
  readonly image: string;

  /** Aired date range. */
  readonly aired: AiredDto;

  /** Anime type. */
  readonly type: string;

  /** Status. */
  readonly status: string;

  /** Creation time, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string;

  /** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string;

}
