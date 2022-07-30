import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeBase, AnimeFilterOptions, AnimeSortField, isAnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { PaginationData } from '@js-camp/core/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { FilterOption, FilterType } from '@js-camp/core/models/filterOption';
import { AnimeType, animeTypeOptionsMap } from '@js-camp/core/models/anime/animeType';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { isSortDirection, SortDirection, SortOptions } from '@js-camp/core/models/sortOptions';

import { AnimeService } from '../../../../core/services/anime.service';
import { ListManager, ListManagerInitParams } from '../../../../core/utils/list-manager';
import { matSortToSortOptions } from '../../../../core/utils/table';
import { getNumberQueryParameter } from '../../../../core/utils/queryParameters';

interface AnimeFiltersType {

  /** Type of search filter. */
  [AnimeFilterOptions.Search]: string | null;

  /** Type of type filter. */
  [AnimeFilterOptions.Type]: readonly AnimeType[] | null;
}

/** Anime table query parameters. */
enum TableQueryParams {
  SEARCH = 'search',
  TYPE = 'type',
  PAGE = 'page',
  PAGE_SIZE = 'pageSize',
  ORDERING_FIELD = 'orderingField',
  ORDERING_DIRECTION = 'orderingDirection',
}

interface QueryParameters {
  [key: string]: string;
}

const MULTIPLE_FILTERS_SEPARATOR = ',';

/** Anime list component. */
@UntilDestroy()
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, AfterViewInit {
  /** Anime list manager. */
  public readonly listManager: ListManager<AnimeBase, AnimeSortField, AnimeFilterOptions>;

  /** List of anime. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  /** Filters form. */
  public readonly filtersForm = this.formBuilder.group<AnimeFiltersType>({
    search: null,
    type: null,
  });

  /** Columns to display in table. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Anime type options map. */
  public readonly animeTypeOptionsMap = animeTypeOptionsMap;

  private readonly queryParams$: BehaviorSubject<QueryParameters> = new BehaviorSubject<QueryParameters>({});

  @ViewChild(MatSort) private tableSort?: MatSort;

  private readonly initialParams: ListManagerInitParams<AnimeSortField, AnimeFilterOptions>;

  public constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    animeService: AnimeService,
  ) {
    this.initialParams = this.getParamsFromQuery(this.activeRoute.snapshot.queryParamMap);
    this.listManager = new ListManager(this.initialParams);
    this.animeList$ = this.listManager.getPaginatedItems(
      (paginationData, sortOptions, filterOptions) => animeService.getAnimeList(
        paginationData,
        sortOptions,
        filterOptions,
      ),
    );
  }

  /**
   * Track by anime by id.
   * @param _index Item index.
   * @param anime Anime model.
   */
  public trackAnimeById(_index: number, anime: AnimeBase): number {
    return anime.id;
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.queryParams$.pipe(
      untilDestroyed(this),
    ).subscribe(
      queryParams => {
        this.router.navigate(
          [],
          {
            queryParams,
            queryParamsHandling: 'merge',
          },
        );
      },
    );

    this.filtersForm.valueChanges.pipe(
      untilDestroyed(this),
    ).subscribe(
      filterValues => {
        const filterOptions: FilterOption<AnimeFilterOptions>[] = [];

        const search = filterValues[AnimeFilterOptions.Search];
        if (search !== null && search !== undefined) {
          filterOptions.push({
            field: AnimeFilterOptions.Search,
            filterType: FilterType.Exact,
            value: search,
          });
        }

        const types = filterValues[AnimeFilterOptions.Type];
        if (types !== null && types !== undefined) {
          filterOptions.push({
            field: AnimeFilterOptions.Type,
            filterType: FilterType.In,
            value: types,
          });
        }
        this.listManager.updateFilters(filterOptions);
      },
    );

    this.listManager.pagePagination$.pipe(
      untilDestroyed(this),
    ).subscribe(
      pagination => {
        this.queryParams$.next({
          [TableQueryParams.PAGE]: pagination.page.toString(),
          [TableQueryParams.PAGE_SIZE]: pagination.pageSize.toString(),
        });
      },
    );
    this.listManager.paginationResetParams$.pipe(
      untilDestroyed(this),
    ).subscribe(
      ([sortOptions, filters]) => {
        const queryParams: QueryParameters = {};

        queryParams[TableQueryParams.ORDERING_FIELD] = sortOptions !== null ? sortOptions.field : '';
        queryParams[TableQueryParams.ORDERING_DIRECTION] = sortOptions !== null ? sortOptions.direction : '';
        if (filters !== null) {
          filters.forEach(filter => {
            queryParams[filter.field] = typeof filter.value === 'string' ? filter.value : filter.value.join(
              MULTIPLE_FILTERS_SEPARATOR,
            );
          });
        }
        this.queryParams$.next(queryParams);
      },
    );
  }

  /** @inheritDoc */
  public ngAfterViewInit(): void {
    const { sortOptions, filtersOptions } = this.getParamsFromQuery(this.activeRoute.snapshot.queryParamMap);
    if (this.tableSort === undefined) {
      throw new Error(
        'There aren\'t table sort block',
      );
    }

    if (sortOptions !== undefined) {
      this.tableSort.sort(
        {
          id: sortOptions.field,
          start: sortOptions.direction,
          disableClear: false,
        },
      );

      // Tricky way to activate styles for sorted column
      (this.tableSort.sortables.get(sortOptions.field) as MatSortHeader)._setAnimationTransitionState(
        { toState: 'active' },
      );
    }

    if (filtersOptions !== undefined) {
      for (const filterOption of filtersOptions) {
        if (typeof filterOption.value === 'string' && filterOption.field === AnimeFilterOptions.Search) {
          this.filtersForm.controls[filterOption.field].setValue(filterOption.value);
        }
        if (filterOption.field === AnimeFilterOptions.Type) {
          this.filtersForm.controls[filterOption.field].setValue(filterOption.value as AnimeType[]);
        }
      }
    }
  }

  /**
   * Paginator changed.
   * @param page Page event.
   */
  public onPaginationChanged(page: PageEvent): void {
    this.listManager.updatePagination(new PaginationData(
      page.pageIndex + 1,
      page.pageSize,
      page.length,
    ), true);
  }

  /**
   * Handle sort changed.
   * @param sort Material sort data.
   */
  public onSortChanged(sort: Sort): void {
    this.listManager.updateSort(matSortToSortOptions<AnimeSortField>(sort));
  }

  /**
   * Get initial parameters from query.
   * @param queryParams URL query parameters map.
   */
  private getParamsFromQuery(
    queryParams: ParamMap,
  ): ListManagerInitParams<AnimeSortField, AnimeFilterOptions> {
    const pageNumber = getNumberQueryParameter(
      queryParams,
      TableQueryParams.PAGE,
    );
    const pageSizeNumber = getNumberQueryParameter(
      queryParams,
      TableQueryParams.PAGE_SIZE,
    );
    const paginationData = new PaginationData(
      pageNumber,
      pageSizeNumber,
    );

    const sortField = queryParams.get(TableQueryParams.ORDERING_FIELD);
    const sortDirection = queryParams.get(TableQueryParams.ORDERING_DIRECTION);
    let sortOptions: SortOptions<AnimeSortField> | undefined;
    if (sortField !== null && isAnimeSortField(sortField)) {
      if (sortDirection !== null && isSortDirection(sortDirection)) {
        sortOptions = {
          field: sortField,
          direction: sortDirection,
        };
      } else {
        sortOptions = {
          field: sortField,
          direction: SortDirection.Ascending,
        };
      }
    }

    const filtersOptions: FilterOption<AnimeFilterOptions>[] = [];
    const typesParam = queryParams.get(TableQueryParams.TYPE);
    if (typesParam !== null) {
      const types: AnimeType[] = [];
      for (const type of typesParam.split(MULTIPLE_FILTERS_SEPARATOR)) {
        if (AnimeType.isAnimeType(type)) {
          types.push(type);
        }
      }
      filtersOptions.push({
        field: AnimeFilterOptions.Type,
        filterType: FilterType.In,
        value: types,
      });
    }

    const searchParam = queryParams.get(TableQueryParams.SEARCH);
    if (searchParam !== null) {
      filtersOptions.push({
        field: AnimeFilterOptions.Search,
        filterType: FilterType.Exact,
        value: searchParam,
      });
    }

    return {
      paginationData,
      sortOptions,
      filtersOptions,
    };
  }
}
