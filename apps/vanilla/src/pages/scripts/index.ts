import { LimitOffsetPagination } from '@js-camp/core/models/limitOffsetPagination';
import { AnimeBase, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';

import { AnimeService } from '../../api/services/animeService';
import {
  ANIME_ID_QUERY_PARAMETER,
  AppUrl,
  EMPTY_SYMBOL,
} from '../../../utils/constants';
import { UserHelpers } from '../../api/helpers';
import { getElementOrRaiseError } from '../../../utils/query';

import { Paginator } from './pagination';
import { SortingProcessor } from './sorting';
import './navbar';

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
    await this.renderBody(animePaginatedList);
    this.tablePaginator.updatePagination(animePaginatedList.count);
  }

  /**
   * Update table body.
   * @param animePaginatedList Paginated list of anime.
   */
  private async renderBody(animePaginatedList: LimitOffsetPagination<AnimeBase>): Promise<void> {
    this.tableBody.innerHTML = '';
    const isUserLoggedIn = await UserHelpers.isUserLoggedIn();
    animePaginatedList.items.forEach(animeBase => {
      this.tableBody.append(this.createTableRow(animeBase, isUserLoggedIn));
    });
  }

  /**
   * Get anime table row.
   * @param animeBase Anime list item.
   * @param isUserLoggedIn Is user logged in.
   */
  private createTableRow(animeBase: AnimeBase, isUserLoggedIn: boolean): HTMLTableRowElement {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('anime-table__row');
    const animeLink = `
        <a class="anime-table__row-link" href="${AppUrl.AnimeDetails}?${ANIME_ID_QUERY_PARAMETER}=${animeBase.id}"></a>
    `;
    tableRow.innerHTML = `
    <td>
        ${isUserLoggedIn ? animeLink : ''}
        <img alt="${animeBase.titleEng}" class="anime-table__row-image" src="${animeBase.image}">
    </td>
    <td>${animeBase.titleEng || EMPTY_SYMBOL}</td>
    <td>${animeBase.titleJapan || EMPTY_SYMBOL}</td>
    <td>${animeBase.airedStart !== null ? animeBase.airedStart.toLocaleDateString() : EMPTY_SYMBOL}</td>
    <td>${AnimeType.toReadable(animeBase.type)}</td>
    <td>${AnimeStatus.toReadable(animeBase.status)}</td>
  `;
    return tableRow;
  }
}
