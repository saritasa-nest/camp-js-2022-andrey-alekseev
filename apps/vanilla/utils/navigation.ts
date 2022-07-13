import { AppUrl } from './constants';

/**
 * Redirect to chosen app url.
 * @param appUrl Application url.
 */
export function redirect(appUrl: AppUrl): void {
  window.location.href = appUrl;
}
