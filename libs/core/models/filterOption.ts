/** Filter type. */
export enum FilterType {
  Exact = 'exact',
  In = 'in',
  CaseInsensitiveContains = 'iContains',
}

/** Filter option for a list of items. */
export interface FilterOption<T> {

  /** Type. */
  readonly filterType: FilterType;

  /** Field by which items should be filtered. */
  readonly field: T;

  /** Value of field by which items should be filtered. */
  readonly value: string;
}
