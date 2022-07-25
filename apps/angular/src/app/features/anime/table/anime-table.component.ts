import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeBase, AnimeFilterOptions, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { PaginationData } from '@js-camp/core/pagination';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { FilterOption, FilterType } from '@js-camp/core/models/filterOption';
import { AnimeType, animeTypeOptionsMap } from '@js-camp/core/models/anime/animeType';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeService } from '../../../../core/services/anime.service';
import { ListManager } from '../../../../core/utils/list-manager';
import { matSortToSortOptions } from '../../../../core/utils/table';

interface AnimeFiltersType {

  /** Type of search filter. */
  [AnimeFilterOptions.Search]: string | null;

  /** Type of type filter. */
  [AnimeFilterOptions.Type]: readonly AnimeType[] | null;
}

/** Aa. */
enum AnimeListQueryParams {
  SEARCH = 'search',
  TYPE_IN = 'typeIn',
  PAGE = 'page',
  PAGE_SIZE = 'pageSize',
  ORDERING_FIELD = 'orderingField',
  ORDERING_DIRECTION = 'orderingDirection',
}

interface QueryParameters {
  [key: string]: string;
}

/** Anime list component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, OnDestroy {
  /** Anime list manager. */
  public listManager: ListManager<AnimeBase, AnimeSortField, AnimeFilterOptions> = new ListManager();

  /** List of anime. */
  public animeList$: Observable<readonly AnimeBase[]>;

  /** Pagination data. */
  public pagination: PaginationData = new PaginationData();

  /** Filters form. */
  public readonly filtersForm = this.formBuilder.group<AnimeFiltersType>({
    search: null,
    type: null,
  });

  /** Columns to display in table. */
  public displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ];

  /** Anime type options map. */
  public animeTypeOptionsMap = animeTypeOptionsMap;

  private queryParams: BehaviorSubject<QueryParameters> = new BehaviorSubject<QueryParameters>({});

  private filtersFormSubscription?: Subscription;

  public constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    animeService: AnimeService,
  ) {
    this.animeList$ = this.listManager.getPaginatedItems(
      (paginationData, sortOptions, filterOptions) => animeService.getAnimeList(
        paginationData,
        sortOptions,
        filterOptions,
      ),
    );
    // eslint-disable-next-line rxjs/no-ignored-observable
    this.queryParams.pipe(
      map(queryParams => {
        this.router.navigate(
          [],
          {
            queryParams,
            queryParamsHandling: 'merge',
          },
        ).toString();
      }),
    ).subscribe();
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.filtersFormSubscription = this.filtersForm.valueChanges.subscribe(
      values => {
        const filterOptions: FilterOption<AnimeFilterOptions>[] = [];

        const search = values[AnimeFilterOptions.Search];
        if (search !== null && search !== undefined) {
          filterOptions.push({
            field: AnimeFilterOptions.Search,
            filterType: FilterType.Exact,
            value: search,
          });
        }

        const types = values[AnimeFilterOptions.Type];
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
    this.listManager.pagePagination$.subscribe(
      pagination => {
        this.queryParams.next({
          [AnimeListQueryParams.PAGE]: pagination.page.toString(),
          [AnimeListQueryParams.PAGE_SIZE]: pagination.pageSize.toString(),
        });
      },
    );
    this.listManager.paginationResetParams$.subscribe(
      ([sortOptions, filters]) => {
        const queryParams: {
          [key: string]: string;
        } = {};
        if (sortOptions !== null) {
          queryParams[AnimeListQueryParams.ORDERING_FIELD] = sortOptions.field;
          queryParams[AnimeListQueryParams.ORDERING_DIRECTION] = sortOptions.direction;
        }
        if (filters !== null) {
          filters.forEach(filter => {
            queryParams[filter.field] = typeof filter.value === 'string' ? filter.value : filter.value.join(',');
          });
        }
        this.queryParams.next(queryParams);
      },
    );
    this.activeRoute.queryParams.subscribe(
      params => {

      },
    );
  }

  /** @inheritDoc */
  public ngOnDestroy(): void {
    this.filtersFormSubscription?.unsubscribe();
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
}
