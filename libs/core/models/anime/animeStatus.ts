import { enumToKeys } from 'enum-to-array';

/** Represents anime status. */
export enum AnimeStatus {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

export namespace AnimeStatus {

  const TO_READABLE_MAP: Readonly<Record<AnimeStatus, string>> = {
    [AnimeStatus.Airing]: 'Airing',
    [AnimeStatus.Finished]: 'Finished',
    [AnimeStatus.NotYetAired]: 'Not yet aired',
  };

  export const statusesList = enumToKeys(TO_READABLE_MAP);

  /**
   * Converts a certain anime status into readable equivalent.
   * @param value AnimeListItem type.
   */
  export function toReadable(value: AnimeStatus): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime status.
   * @param value Value.
   */
  export function toAnimeStatus(value: string): AnimeStatus {
    if (!isAnimeStatus(value)) {
      throw new Error('Unknown anime status');
    }
    return value;
  }

  /**
   * Type guard for anime status.
   * @param value Value.
   */
  export function isAnimeStatus(value: string): value is AnimeStatus {
    return statusesList.includes(value as AnimeStatus);
  }
}
