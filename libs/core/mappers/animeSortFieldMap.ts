import { AnimeSortField } from '../models/anime/animeSortField';

export const animeSortFieldMap: Readonly<Record<AnimeSortField, string>> = {
  [AnimeSortField.Title]: 'title_eng,id',
  [AnimeSortField.AiredStart]: 'aired__startswith,id',
  [AnimeSortField.Status]: 'status',
};
