import { enumToKeys, enumToValues } from 'enum-to-array';

/** Represents anime type. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  ONA = 'ONA',
  Music = 'MUSIC',
  Unknown = 'UNKNOWN',
}

export namespace AnimeType {

  const TO_READABLE_MAP: Readonly<Record<AnimeType, string>> = {
    [AnimeType.TV]: 'TV',
    [AnimeType.OVA]: 'OVA',
    [AnimeType.Movie]: 'Movie',
    [AnimeType.Special]: 'Special',
    [AnimeType.ONA]: 'ONA',
    [AnimeType.Music]: 'Music',
    [AnimeType.Unknown]: 'Unknown',
  };

  export const typesList = enumToKeys(TO_READABLE_MAP);

  /**
   * Converts a certain anime type into readable equivalent.
   * @param value Anime type.
   */
  export function toReadable(value: AnimeType): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime type.
   * @param value Value.
   */
  export function toAnimeType(value: string): AnimeType {
    const type = value as AnimeType;
    if (!(type in TO_READABLE_MAP)) {
      throw new Error('Unknown type');
    }
    return type;
  }

  /**
   * Check if string is anime type.
   * @param type String to check.
   */
  export function isAnimeType(type: string): type is AnimeType {
    return enumToValues(AnimeType).includes(type as AnimeType);
  }

}
