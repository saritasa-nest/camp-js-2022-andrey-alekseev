import { ChangeEvent, FC, memo, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { SortOptions } from '@js-camp/core/models/sortOptions';
import { AnimeSortField } from '@js-camp/core/models/anime/animeSortField';

import { PaginationExtraQuery } from '@js-camp/core/models/pagination/paginationQuery';
import { AnimeFilters } from '@js-camp/core/models/anime/animeBase';

import { MenuSelect } from '../../../../components/MenuSelect';

import { useNotInitEffect } from '../../../../utils/hooks/notInitialEffect';

import style from './AnimeListForm.module.css';

interface Props {

  /** Initial params. */
  readonly initialParams: PaginationExtraQuery<AnimeSortField, AnimeFilters>;

  /** Change callback. */
  readonly paginationExtraQueryChanged: (extraQuery: PaginationExtraQuery<AnimeSortField, AnimeFilters>) => void;
}

const AnimeListFormComponent: FC<Props> = (
  {
    initialParams,
    paginationExtraQueryChanged,
  },
) => {
  const [searchTerm, setSearchTerm] = useState(initialParams.filterOptions?.searchString ?? '');
  const [selectedTypes, setSelectedTypes] = useState<readonly AnimeType[]>(initialParams.filterOptions?.types ?? []);
  const [sortOption, setSortOption] = useState<SortOptions<AnimeSortField> | null>(initialParams.sortOptions);

  /** Clear anime list and reset page. */
  useNotInitEffect(() => {
    paginationExtraQueryChanged({
      sortOptions: sortOption,
      filterOptions: {
        searchString: searchTerm,
        types: selectedTypes,
      },
    });
  }, [searchTerm, selectedTypes, sortOption]);

  /**
   * Set search term.
   * @param event Change event.
   */
  const handleSearchChange = (event: ChangeEvent) => {
    setSearchTerm((event.target as HTMLInputElement).value);
  };

  /**
   * Set selected types.
   * @param selectedOptions Selected types.
   */
  const handleTypesUpdated = (selectedOptions: readonly AnimeType[]) => {
    setSelectedTypes(selectedOptions);
  };

  /**
   * Set selected sorting.
   * @param sortOptions Sort options.
   */
  const handleSortUpdated = (sortOptions: readonly SortOptions<AnimeSortField>[]) => {
    setSortOption(sortOptions.length !== 0 ? sortOptions[0] : null);
  };

  /**
   * Determine if sort option in list.
   * @param options Sort options.
   * @param option Sort option.
   */
  const sortOptionsIncludes = (
    options: readonly SortOptions<AnimeSortField>[],
    option: SortOptions<AnimeSortField>,
  ) => options.filter(
    item => item.field === option.field &&
    item.direction === option.direction,
  ).length === 1;

  return (
    <div className={style['anime-list-form']}>
      <TextField
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
      />
      <MenuSelect
        selectUpdated={handleTypesUpdated}
        isMultiple={true}
        selectOptions={AnimeType.typesList}
        initSelectedOptions={selectedTypes}
        toReadableMapper={AnimeType.toReadable}
        buttonContent={<FilterListIcon/>}
      />
      <MenuSelect
        selectUpdated={handleSortUpdated}
        isMultiple={false}
        initSelectedOptions={sortOption !== null ? [sortOption] : undefined}
        includes={sortOptionsIncludes}
        selectOptions={AnimeSortField.animeSortOptionsList}
        toReadableMapper={AnimeSortField.sortOptionsToReadable}
        buttonContent={<SortIcon/>}
      />
    </div>
  );
};

export const AnimeListForm = memo(AnimeListFormComponent);
