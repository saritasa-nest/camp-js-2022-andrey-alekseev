import { LimitOffsetPagination } from '@js-camp/core/models/limitOffsetPagination';

import { AnimeBase, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';

import M from 'materialize-css';

import { AnimeService } from '../../../api/services/animeService';

import { Paginator } from './pagination';
import { SortingProcessor } from './sorting';

const EMPTY_SYMBOL = '-';

document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();
  const tableBody = document.querySelector<HTMLTableElement>(
    '.anime-table__body',
  );
  if (tableBody === null) {
    throw new Error('There is no table body');
  }
  const tablePaginationBlock = document.querySelector<Element>(
    '.pagination-wrapper',
  );
  if (tablePaginationBlock === null) {
    throw new Error('There is no table pagination block');
  }
  const tableHeader = document.querySelector<Element>(
    '.anime-table__header',
  );
  if (tableHeader === null) {
    throw new Error('There is no table header');
  }
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

  public constructor(
    tableBody: HTMLTableElement,
    tablePaginationBlock: Element,
    tableHeader: Element,
  ) {
    this.tableBody = tableBody;
    this.tablePaginator = new Paginator(
      tablePaginationBlock,
      () => this.renderTable(),
    );
    this.sortingProcessor = new SortingProcessor(
      tableHeader,
      AnimeSortField.Title,
      () => {
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
    this.renderBody(animePaginatedList);
    this.tablePaginator.updatePagination(animePaginatedList.count);
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
}
