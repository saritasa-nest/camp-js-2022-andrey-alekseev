import { LimitOffsetPagination } from '@js-camp/core/models/limitOffsetPagination';
import {
  BehaviorSubject,
  combineLatest, debounceTime,
  map,
  merge,
  Observable,
  shareReplay,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} from 'rxjs';
import { PaginationData } from '@js-camp/core/pagination';
import { SortOptions } from '@js-camp/core/models/sortOptions';
import { FilterOption } from '@js-camp/core/models/filterOption';

export type ApiRequestCallback<TItem, TItemSortFields, TItemFilterFields> = (
  paginationData: PaginationData,
  sortOptions: SortOptions<TItemSortFields> | null,
  filterOptions: readonly FilterOption<TItemFilterFields>[] | null,
) => Observable<LimitOffsetPagination<TItem>>;

/** Manager to work with lists. */
export class ListManager<TItem, TItemSortFields, TItemFilterFields> {

  /** Pagination options.*/
  public readonly pagePagination$: Observable<PaginationData>;

  /** Is list loading. */
  public readonly isLoading$: Observable<boolean>;

  private readonly loading$ = new BehaviorSubject(true);

  private readonly reload$ = new BehaviorSubject<void>(undefined);

  private readonly pagination$ = new BehaviorSubject(new PaginationData());

  private readonly sort$ = new BehaviorSubject<SortOptions<TItemSortFields> | null>(null);

  private readonly filters$ = new BehaviorSubject<readonly FilterOption<TItemFilterFields>[] | null>(null);

  /** Parameters that can reset pagination. */
  private readonly paginationResetParams$: Observable<
    [
      SortOptions<TItemSortFields> | null,
      readonly FilterOption<TItemFilterFields>[] | null,
    ]>;

  public constructor() {
    this.isLoading$ = this.loading$.asObservable();

    this.paginationResetParams$ = combineLatest([
      this.sort$,
      this.filters$,
    ]).pipe(
      debounceTime(500),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.pagePagination$ = merge(
      this.pagination$,
      this.paginationResetParams$.pipe(
        withLatestFrom(this.pagination$),
        map(([, paginationData]) => this.resetPagination(paginationData)),
      ),
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  /**
   * Get paginated items.
   * @param fetchFunc Function to fetch items.
   */
  public getPaginatedItems(
    fetchFunc: ApiRequestCallback<TItem, TItemSortFields, TItemFilterFields>,
  ): Observable<readonly TItem[]> {
    return this.reload$.pipe(
      switchMapTo(this.paginationResetParams$),
      withLatestFrom(this.pagePagination$),
      tap(() => this.loading$.next(true)),
      switchMap(([[sortOptions, filterOptions], pagination]) => fetchFunc(pagination, sortOptions, filterOptions)),
      tap(() => this.loading$.next(false)),
      tap(paginatedList => {
        this.updatePagination(paginatedList.pagination);
      }),
      map(paginatedList => paginatedList.items),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Update pagination.
   * @param pagination New pagination data.
   * @param triggerReload Should re-request items.
   */
  public updatePagination(pagination: PaginationData, triggerReload = false): void {
    this.pagination$.next(pagination);
    if (triggerReload) {
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
  public updateFilters(filterOptions: readonly FilterOption<TItemFilterFields>[] | null): void {
    this.filters$.next(filterOptions);
  }

  /**
   * Set page to first.
   * @param currentPagination Current pagination.
   */
  private resetPagination(currentPagination: PaginationData): PaginationData {
    return new PaginationData(
      1,
      currentPagination.pageSize,
      currentPagination.totalCount,
    );
  }
}
