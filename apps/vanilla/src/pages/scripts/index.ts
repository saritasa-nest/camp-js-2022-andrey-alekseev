import {
  LimitOffsetPagination,
} from '@js-camp/core/models/limitOffsetPagination';
import {
  AnimeBase,
  AnimeSortField,
  isAnimeSortField,
} from '@js-camp/core/models/anime/animeBase';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import {
  isSortDirection,
  SortDirection,
  SortOptions,
} from '@js-camp/core/models/sortOptions';

import { AnimeService } from '../../api/services/animeService';
import { getElementOrRaiseError } from '../../../utils/query';
import { updateQueryParameters } from '../../../utils/helpers';

import { ITEMS_PER_PAGE, Paginator } from './pagination';
import { SortingProcessor } from './sorting';

import './navbar';

const EMPTY_SYMBOL = '-';

const PAGE_QUERY_PARAMETER = 'page';
const SORT_FIELD_QUERY_PARAMETER = 'sortField';
const SORT_DIRECTION_QUERY_PARAMETER = 'sortDirection';

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = getElementOrRaiseError<HTMLTableElement>(
    '.anime-table__body',
  );
  const tablePaginationBlock = getElementOrRaiseError<Element>(
    '.pagination-wrapper',
  );
  const tableHeader = getElementOrRaiseError<Element>(
    '.anime-table__header',
  );
  const table = new Table(
    tableBody,
    tablePaginationBlock,
    tableHeader,
  );
  table.renderTable();
});

/** Class that process table rendering. */
class Table {

  private readonly tableBody: HTMLTableElement;

  private readonly tablePaginator: Paginator;

  private readonly sortingProcessor: SortingProcessor;

  private _tableQueryParameters: TableQueryParameters;

  public constructor(
    tableBody: HTMLTableElement,
    tablePaginationBlock: Element,
    tableHeader: Element,
  ) {
    this.tableBody = tableBody;
    this._tableQueryParameters = this.getQueryParameters();

    this.tablePaginator = new Paginator(
      tablePaginationBlock,
      () => {
        this.tableQueryParameters = {
          ...this._tableQueryParameters,
          page: this.tablePaginator.currentPage,
        };
        this.renderTable();
      },
      this.tableQueryParameters.page,
    );

    let initialSortOptions: SortOptions<AnimeSortField> | null = null;
    if (this.tableQueryParameters.sortField !== undefined) {
      const initialSortDirection = this.tableQueryParameters.sortDirection;
      initialSortOptions = {
        field: this.tableQueryParameters.sortField,
        direction: initialSortDirection !== undefined ? initialSortDirection : SortDirection.Ascending,
      };
    }

    this.sortingProcessor = new SortingProcessor(
      tableHeader,
      initialSortOptions,
      () => {
        const sortOptions = this.sortingProcessor.getSortOptions();
        this.tableQueryParameters = {
          ...this._tableQueryParameters,
          sortField: sortOptions?.field,
          sortDirection: sortOptions?.direction,
        };
        this.tablePaginator.resetPagination();
      },
    );
  }

  /** Fetch anime list and add it to page. */
  public async renderTable(): Promise<void> {
    const paginationOptions = this.tablePaginator.getPaginationOptions();
    const animePaginatedList = await AnimeService.getList(
      paginationOptions,
      this.sortingProcessor.getSortOptions(),
    );
    const totalPages = Math.ceil(animePaginatedList.count / ITEMS_PER_PAGE);
    if (this.tablePaginator.currentPage > totalPages) {
      this.tablePaginator.resetPagination();
    }

    this.renderBody(animePaginatedList);
    this.tablePaginator.updatePagination(totalPages);
  }

  /**
   * Update table body.
   * @param animePaginatedList Paginated list of anime.
   */
  private renderBody(animePaginatedList: LimitOffsetPagination<AnimeBase>): void {
    this.tableBody.innerHTML = '';
    animePaginatedList.items.forEach(animeBase => {
      this.tableBody.append(this.createTableRow(animeBase));
    });
  }

  /**
   * Get anime table row.
   * @param animeBase Anime list item.
   */
  private createTableRow(animeBase: AnimeBase): HTMLTableRowElement {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td>
        <img alt="${animeBase.titleEng}" class="anime-table__row-image" src="${animeBase.image}">
    </td>
    <td>${animeBase.titleEng || EMPTY_SYMBOL}</td>
    <td>${animeBase.titleJapan || EMPTY_SYMBOL}</td>
    <td>${animeBase.airedStart !== null ? animeBase.airedStart.toLocaleString() : EMPTY_SYMBOL}</td>
    <td>${AnimeType.toReadable(animeBase.type)}</td>
    <td>${AnimeStatus.toReadable(animeBase.status)}</td>
  `;
    return tableRow;
  }

  /** Get query parameters from url. */
  private getQueryParameters(): TableQueryParameters {
    let page = 1;
    let sortField;
    let sortDirection;
    const queryParameters = new URLSearchParams(window.location.search);

    const pageString = queryParameters.get(PAGE_QUERY_PARAMETER);
    if (pageString !== null) {
      page = parseInt(pageString, 10);
      if (page <= 0) {
        page = 1;
      }
    }

    sortField = queryParameters.get(SORT_FIELD_QUERY_PARAMETER);
    if (sortField === null || !isAnimeSortField(sortField)) {
      sortField = undefined;
    }

    sortDirection = queryParameters.get(SORT_DIRECTION_QUERY_PARAMETER);
    if (sortField === undefined || sortDirection === null || !isSortDirection(sortDirection)) {
      sortDirection = undefined;
    }

    return {
      page,
      sortField,
      sortDirection,
    };
  }

  /**
   *  Set table query parameters and update url.
   *  @param tableQueryParameters Table query parameters.
   */
  private set tableQueryParameters(tableQueryParameters: TableQueryParameters) {
    this._tableQueryParameters = tableQueryParameters;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(PAGE_QUERY_PARAMETER, this._tableQueryParameters.page.toString());
    if (this._tableQueryParameters.sortField !== undefined) {
      urlParams.set(SORT_FIELD_QUERY_PARAMETER, this._tableQueryParameters.sortField);
    } else {
      urlParams.delete(SORT_FIELD_QUERY_PARAMETER);
    }
    if (this._tableQueryParameters.sortDirection !== undefined) {
      urlParams.set(SORT_DIRECTION_QUERY_PARAMETER, this._tableQueryParameters.sortDirection);
    } else {
      urlParams.delete(SORT_DIRECTION_QUERY_PARAMETER);
    }
    updateQueryParameters(urlParams);
  }

  private get tableQueryParameters(): TableQueryParameters {
    return this._tableQueryParameters;
  }
}

interface TableQueryParameters {

  /** Table page. */
  readonly page: number;

  /** Field to sort. */
  readonly sortField: AnimeSortField | undefined;

  /** Sort direction. */
  readonly sortDirection: SortDirection | undefined;
}
