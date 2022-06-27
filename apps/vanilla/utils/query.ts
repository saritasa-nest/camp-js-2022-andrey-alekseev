/**
 * Get element by selector or raise error if not found.
 * @param selector Selector.
 */
export function getElementOrRaiseError<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`Element not found for query: ${selector}`);
  }
  return element;
}
