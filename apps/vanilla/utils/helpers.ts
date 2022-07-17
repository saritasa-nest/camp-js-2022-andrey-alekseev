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
