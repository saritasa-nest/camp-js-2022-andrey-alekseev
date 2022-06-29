import {
  LimitOffsetPaginationOptions,
} from '@js-camp/core/models/limitOffsetPagination';

import { range } from '../../utils/helpers';

export const ITEMS_PER_PAGE = 10;
export const FIRST_PAGE = 1;

const PAGINATION_BUTTONS_CLASS = 'pagination-block__buttons';
const PAGINATION_BUTTON_CLASS = 'pagination-block__button';
const PAGINATION_BUTTON_ACTIVE_CLASS = 'pagination-block__button_active';

const paginationButtonsIcons = ['chevron_left', 'chevron_right'];

interface PaginationButton {

  /** Is button disabled. */
  readonly isDisabled: boolean;

  /** Is this button of current page. */
  readonly isActive: boolean;

  /** Pagination button content. */
  readonly content: string;

  /** Pagination button page. */
  readonly page: number | null;
}

/** Class that handles pagination. */
export class Paginator {

  /** Pagination block. */
  public readonly paginationBlock: Element;

  /** Callback that must be called after page changed. */
  public readonly pageChangedCallback: Function;

  /** Pagination buttons. */
  private paginationButtonsLi: PaginationButton[];

  /** Current page. */
  private _currentPage = 1;

  public constructor(tablePaginationBlock: Element, pageChangedCallback: Function) {
    this.paginationBlock = tablePaginationBlock;
    this.paginationButtonsLi = [];
    this.pageChangedCallback = pageChangedCallback;
    this.paginationBlock.addEventListener('click', event => this.handleClick(event));
  }

  /**
   * Handle click on pagination bar.
   * @param event Click event.
   */
  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const paginationButtonElement = target.closest<HTMLElement>(
      `.${PAGINATION_BUTTON_CLASS}`,
    );
    if (paginationButtonElement === null) {
      return;
    }

    const { page } = paginationButtonElement.dataset;
    if (page === undefined) {
      return;
    }
    const pageNumber = parseInt(page, 10);

    const paginationButton = this.paginationButtonsLi.find(
      button => button.page === pageNumber,
    );
    if (
      paginationButton === undefined ||
      paginationButton.isActive ||
      paginationButton.isDisabled
    ) {
      return;
    }

    this.currentPage = pageNumber;
  }

  /**
   * Update table pagination.
   * @param totalCount Total count of items.
   */
  public updatePagination(
    totalCount: number,
  ): void {
    this.paginationBlock.innerHTML = '';
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    this.updatePaginationButtons(totalPages);
    this.paginationBlock.append(
      this.renderPaginationButtonsBlock(),
    );
  }

  /**
   * Update pagination buttons array.
   * @param totalPages Total pages.
   */
  private updatePaginationButtons(totalPages: number): void {
    this.paginationButtonsLi = [];
    this.paginationButtonsLi.push(
      {
        isActive: false,
        isDisabled: this._currentPage === FIRST_PAGE,
        page: this._currentPage - 1,
        content: 'chevron_left',
      },
    );
    for (const page of Paginator.getPresentedPages(this.currentPage, totalPages)) {
      this.paginationButtonsLi.push(
        {
          isDisabled: page === null,
          isActive: page === this._currentPage,
          content: page !== null ? page.toString() : '...',
          page,
        },
      );
    }
    this.paginationButtonsLi.push(
      {
        isActive: false,
        isDisabled: this._currentPage === totalPages,
        page: this._currentPage + 1,
        content: 'chevron_right',
      },
    );
  }

  /** Render pagination block links. */
  private renderPaginationButtonsBlock(): HTMLElement {
    const paginationButtonsBlock = document.createElement('ul');
    paginationButtonsBlock.classList.add(
      PAGINATION_BUTTONS_CLASS,
    );

    this.paginationButtonsLi.forEach(paginationButtonLi => {
      const buttonLi = document.createElement('li');
      let { content } = paginationButtonLi;
      const { page, isDisabled, isActive } = paginationButtonLi;
      if (paginationButtonsIcons.includes(content)) {
        content = `<em class="material-icons">${content}</em>`;
      }
      buttonLi.innerHTML = `
        <button
          type="button"
          ${isDisabled ? 'disabled' : ''}
          class="${PAGINATION_BUTTON_CLASS} ${isActive ? PAGINATION_BUTTON_ACTIVE_CLASS : ''}"
          data-page="${page}"
        >
          ${content}
        </button>
      `;
      paginationButtonsBlock.append(buttonLi);
    });
    return paginationButtonsBlock;
  }

  /**
   * Get pages numbers to represent to user.
   *
   * Example with default attributes and current page=6:
   * 1 2 ... 4 5 6 7 8 ... 15 16.
   * @param currentPage Current page.
   * @param totalPages Total pages.
   * @param pagesPerSide Number of pages on each side from current page.
   * @param pagesOnEnd Num of pages on each side at the end.
   */
  private static *getPresentedPages(
    currentPage: number,
    totalPages: number,
    pagesPerSide = 2,
    pagesOnEnd = 2,
  ): Generator<number | null> {
    if (totalPages <= (pagesPerSide + pagesOnEnd) * 2) {
      yield* range(FIRST_PAGE, totalPages);
      return;
    }

    if (currentPage > (1 + pagesPerSide + pagesOnEnd)) {
      yield* range(FIRST_PAGE, pagesOnEnd);
      yield null;
      yield* range(currentPage - pagesPerSide, currentPage);
    } else {
      yield* range(FIRST_PAGE, currentPage);
    }

    if (currentPage < (totalPages - pagesPerSide - pagesOnEnd)) {
      yield* range(currentPage + 1, currentPage + pagesPerSide);
      yield null;
      yield* range(totalPages - pagesOnEnd + 1, totalPages);
    } else {
      yield* range(currentPage + 1, totalPages);
    }
  }

  /** Get pagination options. */
  public getPaginationOptions(): LimitOffsetPaginationOptions {
    return {
      limit: ITEMS_PER_PAGE,
      offset: (this.currentPage - 1) * ITEMS_PER_PAGE,
    };
  }

  /** Set current page to first. */
  public resetPagination(): void {
    this.currentPage = FIRST_PAGE;
  }

  private set currentPage(page: number) {
    this._currentPage = page;
    this.pageChangedCallback();
  }

  private get currentPage(): number {
    return this._currentPage;
  }
}
