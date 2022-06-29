import { SortDirection, SortOptions } from '@js-camp/core/models/sortOptions';

import { AnimeSortField } from '@js-camp/core/models/anime/animeBase';

/** Class for column that can be sorted. */
const SORTABLE_COLUMN_CLASS = 'anime-table__header-column_sortable';

/** Class for sorted column. */
const SORTED_CLASS = 'anime-table__header-column_sort';

const sortDirectionClassMap: Readonly<Record<SortDirection, string>> = {
  [SortDirection.Ascending]: 'anime-table__header-column_sort-asc',
  [SortDirection.Descending]: 'anime-table__header-column_sort-desc',
};

interface CurrentSort {

  /** Sorted item. */
  readonly sortItem: Element;

  /** Sort options. */
  readonly sortOptions: SortOptions<AnimeSortField>;
}

/** Class that processing sorting. */
export class SortingProcessor {

  /** Sorting block. */
  public readonly sortingBlock: Element;

  /** Callback that must be called after sorting changed. */
  public readonly sortingChangedCallback: Function;

  /** Current sort. */
  private _currentSort: CurrentSort | null;

  public constructor(
    sortingBlock: Element,
    initialSortField: AnimeSortField,
    sortingChangedCallback: Function,
  ) {
    const currentSortedItem = sortingBlock.querySelector(
      `[data-sort-field=${initialSortField}]`,
    );
    if (currentSortedItem === null) {
      throw new Error(`There isn't block for ${initialSortField}`);
    }

    this._currentSort = {
      sortItem: currentSortedItem,
      sortOptions: {
        field: initialSortField,
        direction: SortDirection.Ascending,
      },
    };
    this.sortingBlock = sortingBlock;
    this.sortingBlock.addEventListener(
      'click',
        event => this.handleClick(event),
    );

    this.sortingChangedCallback = sortingChangedCallback;
  }

  /** Get current sort options. */
  public getSortOptions(): SortOptions<AnimeSortField> | null {
    if (this._currentSort !== null) {
      return this._currentSort.sortOptions;
    }
    return null;
  }

  /**
   * Handle click on header.
   * @param event Click event.
   */
  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target === null) {
      return;
    }

    const sortableColumn = target.closest<HTMLElement>(`.${SORTABLE_COLUMN_CLASS}`);
    if (sortableColumn !== null) {
      this.updateSort(sortableColumn.dataset.sortField as AnimeSortField, sortableColumn);
    }
  }

  /**
   * Update sort column.
   * @param sortField - Field to sort.
   * @param sortItem - Item to sort.
   */
  private updateSort(sortField: AnimeSortField, sortItem: Element): void {

    const isAlreadySorted =
      this._currentSort?.sortOptions.field === sortField;

    const isDropSortAction = isAlreadySorted &&
      this._currentSort?.sortOptions.direction === SortDirection.Descending;
    if (isDropSortAction) {
      this.dropCurrentSortClasses();
      this.currentSort = null;
      return;
    }

    if (isAlreadySorted) {
      sortItem.classList.remove(
        sortDirectionClassMap.Ascending,
      );
      sortItem.classList.add(
        sortDirectionClassMap.Descending,
      );
      this.currentSort = {
        sortItem,
        sortOptions: {
          field: sortField,
          direction: SortDirection.Descending,
        },
      };
      return;
    }

    this.dropCurrentSortClasses();
    sortItem.classList.add(
      SORTED_CLASS,
      sortDirectionClassMap.Ascending,
    );
    this.currentSort = {
      sortItem,
      sortOptions: {
        field: sortField,
        direction: SortDirection.Ascending,
      },
    };
  }

  private set currentSort(currentSort: CurrentSort | null) {
    this._currentSort = currentSort;
    this.sortingChangedCallback();
  }

  /** Remove classes from current sort column. */
  private dropCurrentSortClasses(): void {
    this._currentSort?.sortItem.classList.remove(
      SORTED_CLASS,
      sortDirectionClassMap.Ascending,
      sortDirectionClassMap.Descending,
    );
  }
}
