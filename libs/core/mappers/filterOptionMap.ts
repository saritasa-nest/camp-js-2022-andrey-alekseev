import { FilterOption, FilterType } from '../models/filterOption';

const filterTypeMap: Readonly<Record<FilterType, string>> = {
  [FilterType.Exact]: '',
  [FilterType.In]: '__in',
  [FilterType.CaseInsensitiveContains]: '__icontains',
};

/** Filter parameter. */
export interface FilterParameters {
  [key: string]: string;
}

export namespace FilterOptionMap {

  /**
   * Map filter options to filter parameters.
   * @param filterOptions Filter options for some item.
   */
  export function toDto<T>(
    filterOptions: readonly FilterOption<T>[],
  ): FilterParameters {
    const result: FilterParameters = {};
    filterOptions.forEach(filterOption => {
      const filterParam = `${filterOption.field}${filterTypeMap[filterOption.filterType]}`;
      result[filterParam] = typeof filterOption.value === 'string' ? filterOption.value : filterOption.value.join(',');
    });
    return result;
  }
}
