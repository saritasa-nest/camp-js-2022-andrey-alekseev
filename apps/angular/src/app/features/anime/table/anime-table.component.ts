import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeBase, AnimeFilters, AnimeSortField, isAnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { Observable, tap, withLatestFrom } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isSortDirection, SortDirection, SortOptions } from '@js-camp/core/models/sortOptions';
import { Pagination } from '@js-camp/core/models/pagination/pagination';

import { AnimeService } from '../../../../core/services/anime.service';
import { ListManager, ListManagerInitParams } from '../../../../core/utils/list-manager';
import { matSortToSortOptions } from '../../../../core/utils/table';
import { getNumberQueryParameter } from '../../../../core/utils/queryParameters';

interface AnimeFiltersFormData {

  /** Type of search filter. */
  readonly search: string | null;

  /** Type of type filter. */
  readonly type: readonly AnimeType[] | null;
}

/** Anime table query parameters. */
enum TableQueryParams {
  Search = 'search',
  Type = 'type',
  Page = 'page',
  PageSize = 'pageSize',
  OrderingField = 'orderingField',
  OrderingDirection = 'orderingDirection',
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
  public readonly listManager: ListManager<AnimeBase, AnimeSortField, AnimeFilters>;

  /** List of anime. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  /** Filters form. */
  public readonly filtersForm = this.formBuilder.group<AnimeFiltersFormData>({
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

  /** Anime type. */
  public readonly animeType = AnimeType;

  @ViewChild(MatSort)
  private readonly tableSort?: MatSort;

  private readonly initialParams: ListManagerInitParams<AnimeSortField, AnimeFilters>;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    animeService: AnimeService,
  ) {
    this.initialParams = this.getParamsFromQuery(this.activeRoute.snapshot.queryParamMap);
    this.listManager = new ListManager(this.initialParams);
    this.animeList$ = this.listManager.getPaginatedItems(
      paginationQuery => animeService.getAnimeList(paginationQuery),
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
    this.filtersForm.valueChanges.pipe(
      tap(({ search, type }) => {
        const filterOptions: AnimeFilters = {
          searchString: search != null ? search : '',
          types: type != null ? type : [],
        };

        this.listManager.updateFilters(filterOptions);
      }),
      untilDestroyed(this),
    ).subscribe();

    this.listManager.pagination$.pipe(
      withLatestFrom(this.listManager.paginationExtraOptions$),
      tap(([pagination, { sortOptions, filterOptions }]) => {
        const queryParams: Record<string, string> = {
          [TableQueryParams.Page]: pagination.page.toString(),
          [TableQueryParams.PageSize]: pagination.pageSize.toString(),
          [TableQueryParams.OrderingField]: sortOptions !== null ? sortOptions.field : '',
          [TableQueryParams.OrderingDirection]: sortOptions !== null ? sortOptions.direction : '',
          [TableQueryParams.Type]: filterOptions !== null ? filterOptions.types.join(MULTIPLE_FILTERS_SEPARATOR) : '',
          [TableQueryParams.Search]: filterOptions !== null ? filterOptions.searchString : '',
        };

        this.router.navigate(
          [],
          {
            queryParams,
            queryParamsHandling: 'merge',
          },
        );
      }),
      untilDestroyed(this),
    ).subscribe();
  }

  /** @inheritDoc */
  public ngAfterViewInit(): void {
    const { sortOptions, filtersOptions } = this.initialParams;
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
    }

    if (filtersOptions === undefined) {
      return;
    }

    this.filtersForm.controls.search.setValue(filtersOptions.searchString);
    this.filtersForm.controls.type.setValue(filtersOptions.types);
  }

  /**
   * Paginator changed.
   * @param page Page event.
   */
  public onPaginationChanged(page: PageEvent): void {
    this.listManager.updatePagination({
      pagination: new Pagination(
        page.pageIndex,
        page.pageSize,
        page.length,
      ),
    });
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
  ): ListManagerInitParams<AnimeSortField, AnimeFilters> {
    const pageNumber = getNumberQueryParameter(
      queryParams,
      TableQueryParams.Page,
    );
    const pageSizeNumber = getNumberQueryParameter(
      queryParams,
      TableQueryParams.PageSize,
    );
    const pagination = new Pagination(
      pageNumber,
      pageSizeNumber,
    );

    const sortField = queryParams.get(TableQueryParams.OrderingField);
    const sortDirection = queryParams.get(TableQueryParams.OrderingDirection);
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

    const typesParam = queryParams.get(TableQueryParams.Type);
    const types: AnimeType[] = [];
    if (typesParam !== null) {
      for (const type of typesParam.split(MULTIPLE_FILTERS_SEPARATOR)) {
        if (AnimeType.isAnimeType(type)) {
          types.push(type);
        }
      }
    }
    const searchParam = queryParams.get(TableQueryParams.Search);
    const filtersOptions: AnimeFilters = {
      types,
      searchString: searchParam !== null ? searchParam : '',
    };

    return {
      pagination,
      sortOptions,
      filtersOptions,
    };
  }
}
