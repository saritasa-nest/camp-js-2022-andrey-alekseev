import { AnimeFilterOptions } from '@js-camp/core/models/anime/animeBase';
import { FilterOption, FilterType } from '@js-camp/core/models/filterOption';
import M from 'materialize-css';
import { AnimeType } from '@js-camp/core/models/anime/animeType';

import { getElementOrRaiseError } from '../../../utils/query';

import { TableUpdateCallback } from './types';

document.addEventListener('DOMContentLoaded', () => {
  const typesSelect = getElementOrRaiseError<HTMLSelectElement>(
    '.types-select',
  );
  for (const animeType of AnimeType.typesList) {
    const typeOption = document.createElement('option');
    typeOption.value = animeType;
    typeOption.textContent = AnimeType.toReadable(animeType);
    typesSelect.options.add(typeOption);
  }
  M.FormSelect.init(typesSelect);
});

/** Class that processing filtering. */
export class FiltersHandler {

  /** Types select. */
  private readonly typesSelect: HTMLSelectElement;

  /** Current filters. */
  private _filterOptions: readonly FilterOption<AnimeFilterOptions>[];

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
  private updateFilters(filterField: AnimeFilterOptions, value: string): void {
    this._filterOptions = this._filterOptions.filter(
      filterOption => filterOption.field !== AnimeFilterOptions.Type,
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
    this.updateFilters(AnimeFilterOptions.Type, value);
  }

  /** Get filter options. */
  public get filterOptions(): readonly FilterOption<AnimeFilterOptions>[] {
    return this._filterOptions;
  }
}
