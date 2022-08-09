import { enumToKeys } from 'enum-to-array';

/** Represents anime rating. */
export enum AnimeRating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG_13',
  R17 = 'R_17',
  RPlus = 'R_PLUS',
  RX = 'R_X',
  Unknown = 'UNKNOWN',
}

export namespace AnimeRating {

  const TO_READABLE_MAP: Readonly<Record<AnimeRating, string>> = {
    [AnimeRating.G]: 'G',
    [AnimeRating.PG]: 'PG',
    [AnimeRating.PG13]: 'PG13',
    [AnimeRating.R17]: 'R17',
    [AnimeRating.RPlus]: 'R+',
    [AnimeRating.RX]: 'Rx',
    [AnimeRating.Unknown]: 'Unknown',
  };

  export const ratingsList = enumToKeys(TO_READABLE_MAP);

  /**
   * Converts a certain anime rating into readable equivalent.
   * @param value Rating.
   */
  export function toReadable(value: AnimeRating): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime rating.
   * @param value Value.
   */
  export function toAnimeRating(value: string): AnimeRating {
    if (!isAnimeRating(value)) {
      throw new Error('Not expected anime rating');
    }
    return value;
  }

  /**
   * Type guard for anime rating.
   * @param value Value.
   */
  export function isAnimeRating(value: string): value is AnimeRating {
    return ratingsList.includes(value as AnimeRating);
  }
}
