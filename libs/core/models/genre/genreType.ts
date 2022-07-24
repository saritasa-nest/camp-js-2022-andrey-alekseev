/** Represents genre type. */
export enum GenreType {
  Genres = 'GENRES',
  ExplicitGenres = 'EXPLICIT_GENRES',
  Themes = 'THEMES',
  Demographics = 'DEMOGRAPHICS',
  Unknown = 'unknown',
}

export namespace GenreType {

  const TO_READABLE_MAP: Readonly<Record<GenreType, string>> = {
    [GenreType.Genres]: 'Genres',
    [GenreType.ExplicitGenres]: 'Explicit genres',
    [GenreType.Themes]: 'Themes',
    [GenreType.Demographics]: 'Demographics',
    [GenreType.Unknown]: 'Unknown',
  };

  /**
   * Converts a certain genre type into readable equivalent.
   * @param value Genre type.
   */
  export function toReadable(value: GenreType): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into genre type.
   * @param value Value.
   */
  export function toGenreType(value: string): GenreType {
    const type = value as GenreType;
    return TO_READABLE_MAP[type] ? type : GenreType.Unknown;
  }
}
