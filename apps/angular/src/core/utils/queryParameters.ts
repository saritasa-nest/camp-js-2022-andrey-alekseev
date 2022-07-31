import { ParamMap } from '@angular/router';

/**
 * Get number from query parameters.
 * @param paramsMap Parameters map.
 * @param key Key of parameter.
 */
export function getNumberQueryParameter(paramsMap: ParamMap, key: string): number | undefined {
  const stringParam = paramsMap.get(key);
  if (stringParam === null) {
    return undefined;
  }
  const numberParam = parseInt(stringParam, 10);

  if (Number.isNaN(numberParam)) {
    return undefined;
  }
  return numberParam;
}
