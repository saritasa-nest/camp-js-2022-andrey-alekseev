/**
 * Generate for range of numbers.
 * @param start - Start of range.
 * @param end - End of range.
 */
export function* range(start: number, end: number): Generator<number> {
  for (let num = start; num <= end; num += 1) {
    yield num;
  }
}

/**
 * Update query parameters without reloading page.
 * @param newQueryParameters New query parameters.
 */
export function updateQueryParameters(newQueryParameters: URLSearchParams): void {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${newQueryParameters.toString()}`;
  window.history.replaceState(null, '', newUrl);
}
