import {
  BehaviorSubject,
  combineLatest, debounceTime,
  map,
  merge,
  Observable,
  shareReplay,
  skip,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs';
import { SortOptions } from '@js-camp/core/models/sortOptions';
import { PaginatedItems } from '@js-camp/core/models/pagination/paginatedItems';
import { Pagination } from '@js-camp/core/models/pagination/pagination';
import { PaginationQuery } from '@js-camp/core/models/pagination/paginationQuery';

export type GetListCallback<TItem, TItemSortFields, TItemFilters> = (
  paginationQuery: PaginationQuery<TItemSortFields, TItemFilters>
) => Observable<PaginatedItems<TItem>>;

/** List manager initial params. */
export interface ListManagerInitParams<TItemSortFields, TItemFilters> {

  /** Initial pagination data. */
  readonly pagination?: Pagination;

  /** Initial sort options. */
  readonly sortOptions?: SortOptions<TItemSortFields>;

  /** Initial filters options. */
  readonly filtersOptions?: TItemFilters;
}

interface PaginationExtraOptions<TItemSortFields, TItemFilters> {

  /** Sort options. */
  readonly sortOptions: SortOptions<TItemSortFields> | null;

  /** Filter options. */
  readonly filterOptions: TItemFilters | null;
}

interface PaginationUpdateParams {

  /** Pagination. */
  readonly pagination: Pagination;

  /** Should trigger update. */
  readonly triggerUpdate?: boolean;
}

/** Manager to work with lists. */
export class ListManager<TItem, TItemSortFields, TItemFilters> {

  /** Pagination options.*/
  public readonly pagination$: Observable<Pagination>;

  /** Parameters that can reset pagination. */
  public readonly paginationExtraOptions$: Observable<PaginationExtraOptions<TItemSortFields, TItemFilters>>;

  private readonly loading$ = new BehaviorSubject<boolean>(true);

  private readonly reload$ = new BehaviorSubject<void>(undefined);

  private readonly currentPagination$: BehaviorSubject<Pagination>;

  private readonly sort$: BehaviorSubject<SortOptions<TItemSortFields> | null>;

  private readonly filters$: BehaviorSubject<TItemFilters | null>;

  /** Is list loading. */
  public readonly isLoading$: Observable<boolean> = this.loading$.asObservable();

  public constructor({
    pagination,
    sortOptions,
    filtersOptions,
  }: ListManagerInitParams<TItemSortFields, TItemFilters> = {}) {
    this.sort$ = new BehaviorSubject(sortOptions ?? null);
    this.currentPagination$ = new BehaviorSubject(pagination ?? new Pagination());
    this.filters$ = new BehaviorSubject(filtersOptions !== undefined ? filtersOptions : null);

    this.paginationExtraOptions$ = combineLatest({
      /* eslint-disable rxjs/finnish */
      sortOptions: this.sort$,
      filterOptions: this.filters$,
      /* eslint-enable rxjs/finnish */
    }).pipe(
      debounceTime(500),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    const paginationReset$ = this.paginationExtraOptions$.pipe(

      // Skip first emmit because it resets initial passed pagination
      skip(1),
      withLatestFrom(this.currentPagination$),
      map(([, paginationData]) => this.resetPagination(paginationData)),
    );

    this.pagination$ = merge(
      this.currentPagination$,
      paginationReset$,
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  /**
   * Get paginated items.
   * @param fetchFunc Function to fetch items.
   */
  public getPaginatedItems(
    fetchFunc: GetListCallback<TItem, TItemSortFields, TItemFilters>,
  ): Observable<readonly TItem[]> {
    return this.reload$.pipe(
      switchMapTo(this.paginationExtraOptions$),
      withLatestFrom(this.pagination$),
      tap(() => this.loading$.next(true)),
      switchMap(([{ sortOptions, filterOptions }, pagination]) => fetchFunc({
        pagination,
        sortOptions,
        filterOptions,
      })),
      tap(() => this.loading$.next(false)),
      tap(paginatedList => {
        this.updatePagination(
          {
            pagination: paginatedList.pagination,
            triggerUpdate: false,
          },
        );
      }),
      map(paginatedList => paginatedList.items),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Update pagination.
   * @param pagination New pagination data.
   * @param triggerUpdate Should re-request items.
   */
  public updatePagination({ pagination, triggerUpdate = true }: PaginationUpdateParams): void {
    this.currentPagination$.next(pagination);
    if (triggerUpdate) {
      this.reload$.next();
    }
  }

  /**
   * Update sorting.
   * @param sortOptions Sort options.
   */
  public updateSort(sortOptions: SortOptions<TItemSortFields> | null): void {
    this.sort$.next(sortOptions);
  }

  /**
   * Update filters.
   * @param filterOptions Filter options.
   */
  public updateFilters(filterOptions: TItemFilters): void {
    this.filters$.next(filterOptions);
  }

  /**
   * Set page to first.
   * @param currentPagination Current pagination.
   */
  private resetPagination(currentPagination: Pagination): Pagination {
    return new Pagination(
      0,
      currentPagination.pageSize,
      currentPagination.totalCount,
    );
  }
}
