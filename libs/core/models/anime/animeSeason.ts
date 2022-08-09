import { enumToKeys } from 'enum-to-array';

/** Represents anime season. */
export enum AnimeSeason {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
  NonSeasonal = 'NON_SEASONAL',
}

export namespace AnimeSeason {

  const TO_READABLE_MAP: Readonly<Record<AnimeSeason, string>> = {
    [AnimeSeason.Summer]: 'Summer',
    [AnimeSeason.Winter]: 'Winter',
    [AnimeSeason.Spring]: 'Spring',
    [AnimeSeason.Fall]: 'Fall',
    [AnimeSeason.NonSeasonal]: 'Non seasonal',
  };

  export const seasonsList = enumToKeys(TO_READABLE_MAP);

  /**
   * Converts a certain anime season into readable equivalent.
   * @param value Season type.
   */
  export function toReadable(value: AnimeSeason): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime season.
   * @param value Value.
   */
  export function toAnimeSeason(value: string): AnimeSeason {
    if (!isAnimeSeason(value)) {
      throw new Error('Not expected anime season');
    }
    return value;
  }

  /**
   * Type guard for anime season.
   * @param value Value.
   */
  export function isAnimeSeason(value: string): value is AnimeSeason {
    return seasonsList.includes(value as AnimeSeason);
  }
}
