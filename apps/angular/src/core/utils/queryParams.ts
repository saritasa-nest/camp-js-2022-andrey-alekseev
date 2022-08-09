import { ParamMap } from '@angular/router';

import { AppError } from '../models/app-errors';

/**
 * Get `id` parameter from query.
 * @param paramMap Params map.
 */
export function getIdParamFromQuery(paramMap: ParamMap): number {
  const idParam = paramMap.get('id');
  if (idParam === null) {
    throw new AppError('Id is not provided');
  }
  const id = parseInt(idParam, 10);
  if (Number.isNaN(id) && id < 0) {
    throw new AppError('Not valid id');
  }
  return id;
}
