import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * This hook gets called only when the dependencies change but not during initial render.
 * @param func Callback.
 * @param deps Dependency list.
 */
export const useNotInitEffect = (func: EffectCallback, deps?: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
