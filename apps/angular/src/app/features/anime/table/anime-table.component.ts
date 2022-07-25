import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeBase, AnimeFilterOptions, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { PaginationData } from '@js-camp/core/pagination';
import { Observable, Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { FilterOption, FilterType } from '@js-camp/core/models/filterOption';
import { AnimeType, animeTypeOptionsMap } from '@js-camp/core/models/anime/animeType';

import { AnimeService } from '../../../../core/services/anime.service';
import { ListManager } from '../../../../core/utils/list-manager';
import { matSortToSortOptions } from '../../../../core/utils/table';

interface AnimeFiltersType {

  /** Type of search filter. */
  [AnimeFilterOptions.Search]: string | null;

  /** Type of type filter. */
  [AnimeFilterOptions.Type]: readonly AnimeType[] | null;
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

  private filtersFormSubscription?: Subscription;

  public constructor(
    private formBuilder: FormBuilder,
    animeService: AnimeService,
  ) {
    this.animeList$ = this.listManager.getPaginatedItems(
      (paginationData, sortOptions, filterOptions) => animeService.getAnimeList(
        paginationData,
        sortOptions,
        filterOptions,
      ),
    );
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
