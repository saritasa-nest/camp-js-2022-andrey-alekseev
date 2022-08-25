import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import {
  selectAllAnimeBase,
  selectAnimeBaseTotalCount,
  selectIsAnimeBaseLoading,
} from '@js-camp/react/store/animeBase/selectors';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Box, debounce } from '@mui/material';
import {
  DEFAULT_PAGE_SIZE,
  Pagination,
} from '@js-camp/core/models/pagination/pagination';
import { getAnimeList } from '@js-camp/react/store/animeBase/dispatchers';
import {
  isSortDirection,
  SortDirection,
  SortOptions,
} from '@js-camp/core/models/sortOptions';
import { AnimeSortField } from '@js-camp/core/models/anime/animeSortField';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { PaginationExtraQuery } from '@js-camp/core/models/pagination/paginationQuery';
import { AnimeFilters } from '@js-camp/core/models/anime/animeBase';
import { clearAnimeList, setLoading } from '@js-camp/react/store/animeBase/slice';

import { AnimeList } from '../../components/AnimeList';
import { InfiniteScroller } from '../../../../components/InfiniteScroller';
import { AnimeListForm } from '../../components/AnimeListForm';

import style from './AnimePage.module.css';

/** Anime list query parameters. */
enum ListQueryParams {
  Search = 'search',
  Type = 'type',
  OrderingField = 'orderingField',
  OrderingDirection = 'orderingDirection',
}

const MULTIPLE_FILTERS_SEPARATOR = ',';

/**
 * Get initial params from query.
 * @param urlSearchParams Query params.
 */
function getInitialParamsFromQuery(
  urlSearchParams: URLSearchParams,
): PaginationExtraQuery<AnimeSortField, AnimeFilters> {
  const sortField = urlSearchParams.get(ListQueryParams.OrderingField);
  const sortDirection = urlSearchParams.get(ListQueryParams.OrderingDirection);
  let sortOption: SortOptions<AnimeSortField> | null = null;
  if (sortField !== null && AnimeSortField.isAnimeSortField(sortField)) {
    if (sortDirection !== null && isSortDirection(sortDirection)) {
      sortOption = {
        field: sortField,
        direction: sortDirection,
      };
    } else {
      sortOption = {
        field: sortField,
        direction: SortDirection.Ascending,
      };
    }
  }

  const typesParam = urlSearchParams.get(ListQueryParams.Type);
  const types: AnimeType[] = [];
  if (typesParam !== null) {
    for (const type of typesParam.split(MULTIPLE_FILTERS_SEPARATOR)) {
      if (AnimeType.isAnimeType(type)) {
        types.push(type);
      }
    }
  }
  const searchTerm = urlSearchParams.get(ListQueryParams.Search) ?? '';

  return {
    sortOptions: sortOption,
    filterOptions: {
      searchString: searchTerm,
      types,
    },
  };
}

const AnimesPageComponent: FC = () => {
  const animeList = useAppSelector(selectAllAnimeBase);
  const isLoading = useAppSelector(selectIsAnimeBaseLoading);
  const totalCount = useAppSelector(selectAnimeBaseTotalCount);
  const [search, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPagination] = useState(0);
  const [paginationExtraQuery, setPaginationExtraQuery] = useState(
    getInitialParamsFromQuery(search),
  );
  const animeListRef = useRef<HTMLElement>();

  const setNextPage = () => {
    setCurrentPagination(page => page + 1);
  };

  /** Set first page and scroll to top. */
  const resetPage = () => {
    setCurrentPagination(0);
    animeListRef?.current?.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(
      getAnimeList({
        pagination: new Pagination(currentPage, DEFAULT_PAGE_SIZE),
        ...paginationExtraQuery,
      }),
    );
  }, [currentPage, paginationExtraQuery]);

  useEffect(() => {
    const newParams = new URLSearchParams(search);
    newParams.set(
      ListQueryParams.Search,
      paginationExtraQuery.filterOptions?.searchString ?? '',
    );
    newParams.set(
      ListQueryParams.Type,
      paginationExtraQuery.filterOptions?.types.join(
        MULTIPLE_FILTERS_SEPARATOR,
      ) ?? '',
    );
    newParams.set(
      ListQueryParams.OrderingField,
      paginationExtraQuery.sortOptions?.field ?? '',
    );
    newParams.set(
      ListQueryParams.OrderingDirection,
      paginationExtraQuery.sortOptions?.direction ?? '',
    );
    setSearchParams(newParams, { replace: true });
  }, [paginationExtraQuery]);

  const paginationExtraQueryChanged = (
    extraQuery: PaginationExtraQuery<AnimeSortField, AnimeFilters>,
  ) => {
    setPaginationExtraQuery(extraQuery);
    resetPage();
    dispatch(clearAnimeList());
    dispatch(setLoading());
  };

  /** Determine if there are other objects in the list. */
  const hasMore = useMemo(() => {
    if (totalCount === undefined) {
      return true;
    }
    const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE) - 1;
    return currentPage < totalPages;
  }, [totalCount, currentPage]);

  return (
    <div className={style['anime-page-wrapper']}>
      <Box className={style['anime-list']} ref={animeListRef}>
        <div className={style['anime-list__toolbar']}>
          <AnimeListForm
            paginationExtraQueryChanged={debounce(
              paginationExtraQueryChanged,
              500,
            )}
            initialParams={paginationExtraQuery}
          />
        </div>
        <InfiniteScroller
          loadMore={setNextPage}
          hasMore={hasMore}
          isLoading={isLoading}
        >
          <AnimeList animeList={animeList} isLoading={isLoading} />
        </InfiniteScroller>
      </Box>
      <Box className={style['anime-details']}>
        <Outlet />
      </Box>
    </div>
  );
};

export const AnimesPage = memo(AnimesPageComponent);
