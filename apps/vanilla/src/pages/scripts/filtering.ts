import { AnimeFilterField } from '@js-camp/core/models/anime/animeBase';
import { FilterOption, FilterType } from '@js-camp/core/models/filterOption';

import M from 'materialize-css';

import { AnimeType } from '@js-camp/core/models/anime/animeType';

import { getElementOrRaiseError } from '../../../utils/query';

import { TableUpdateCallback } from './types';

const animeTypeOptionsMap: Readonly<Record<AnimeType, string>> = {
  [AnimeType.TV]: AnimeType.toReadable(AnimeType.TV),
  [AnimeType.OVA]: AnimeType.toReadable(AnimeType.OVA),
  [AnimeType.Movie]: AnimeType.toReadable(AnimeType.Movie),
  [AnimeType.Special]: AnimeType.toReadable(AnimeType.Special),
  [AnimeType.ONA]: AnimeType.toReadable(AnimeType.ONA),
  [AnimeType.Music]: AnimeType.toReadable(AnimeType.Music),
  [AnimeType.Unknown]: AnimeType.toReadable(AnimeType.Unknown),
};

document.addEventListener('DOMContentLoaded', () => {
  const typesSelect = getElementOrRaiseError<HTMLSelectElement>(
    '.types-select',
  );
  for (const [value, label] of Object.entries(animeTypeOptionsMap)) {
    if (value === 'unknown') {
      continue;
    }
    const typeOption = document.createElement('option');
    typeOption.value = value;
    typeOption.textContent = label;
    typesSelect.options.add(typeOption);
  }
  M.FormSelect.init(typesSelect);
});

/** Class that processing filtering. */
export class FiltersHandler {

  /** Types select. */
  private readonly typesSelect: HTMLSelectElement;

  /** Current filters. */
  private _filterOptions: readonly FilterOption<AnimeFilterField>[];

  public constructor(
    /** Callback that must be called after filters changed. */
    private readonly filtersChangedCallback: TableUpdateCallback,
  ) {
    this._filterOptions = [];
    this.filtersChangedCallback = filtersChangedCallback;
    this.typesSelect = getElementOrRaiseError<HTMLSelectElement>(
      `.types-select`,
    );
    this.typesSelect.addEventListener(
      'change',
      () => this.onTypeSelected(),
    );
  }

  /**
   * Update filters.
   * @param filterField Field to sort.
   * @param value Field value.
   */
  private updateFilters(filterField: AnimeFilterField, value: string): void {
    this._filterOptions = this._filterOptions.filter(
      filterOption => filterOption.field !== AnimeFilterField.Type,
    );
    this._filterOptions = [
      ...this._filterOptions,
      {
        filterType: FilterType.Exact,
        field: filterField,
        value,
      },
    ];
    this.filtersChangedCallback();
  }

  /** Handle type selected. */
  private onTypeSelected(): void {
    const { value } = this.typesSelect;
    this.updateFilters(AnimeFilterField.Type, value);
  }

  /** Get filter options. */
  public get filterOptions(): readonly FilterOption<AnimeFilterField>[] {
    return this._filterOptions;
  }
}
