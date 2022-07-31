import { map, Observable } from 'rxjs';

/**
 * Custom operator that provides isFirst parameter.
 * `isFirst` says is this first emit.
 * @param predicate Predicate in which isFirst parameter will be provided.
 */
export function withIsFirst<TItem, TReturn>(
  predicate: (item: TItem, isFirst: boolean) => TReturn,
): (source$: Observable<TItem>) => Observable<TReturn> {
  let isFirst = true;
  return (source$: Observable<TItem>) => source$.pipe<TReturn>(
      map(item => {
        const result = predicate(item, isFirst);
        isFirst = false;
        return result;
      }),
  );
}
