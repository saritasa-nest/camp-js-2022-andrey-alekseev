interface ItemWithId {

  /** Id. */
  readonly id: number;
}

/**
 * Track by item id.
 * @param _index List index.
 * @param item Item with id.
 */
export function trackById<T extends ItemWithId>(_index: number, item: T): number {
  return item.id;
}
