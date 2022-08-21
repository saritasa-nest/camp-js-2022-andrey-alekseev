import { enumToKeys, enumToValues } from 'enum-to-array';

import { SortDirection, SortOptions } from '../sortOptions';

/** Fields available for sorting anime. */
export enum AnimeSortField {
  Title = 'titleEng',
  AiredStart = 'airedStart',
  Status = 'status',
}

export namespace AnimeSortField {

  const TO_READABLE_MAP: Readonly<Record<AnimeSortField, string>> = {
    [AnimeSortField.Title]: 'English title',
    [AnimeSortField.AiredStart]: 'Aired start',
    [AnimeSortField.Status]: 'Status',
  };

  export const animeSortFieldList = enumToKeys(TO_READABLE_MAP);

  /** List of all available sort options. */
  export const animeSortOptionsList: SortOptions<AnimeSortField>[] = animeSortFieldList.reduce(
    (sortOptions, sortField) => {
      sortOptions.push({
        field: sortField,
        direction: SortDirection.Ascending,
      });
      sortOptions.push({
        field: sortField,
        direction: SortDirection.Descending,
      });
      return sortOptions;
    },
    [] as SortOptions<AnimeSortField>[],
  );

  /**
   * Converts a certain anime sort field into readable equivalent.
   * @param value Anime sort field.
   */
  export function toReadable(value: AnimeSortField): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts a certain anime sort options into readable equivalent.
   * @param value Anime sort field.
   */
  export function sortOptionsToReadable(value: SortOptions<AnimeSortField>): string {
    return `${TO_READABLE_MAP[value.field]}(${value.direction})`;
  }

  /**
   * Check if string is anime sort field.
   * @param sortField String to check.
   */
  export function isAnimeSortField(
    sortField: string,
  ): sortField is AnimeSortField {
    return enumToValues(AnimeSortField).includes(sortField as AnimeSortField);
  }
}
