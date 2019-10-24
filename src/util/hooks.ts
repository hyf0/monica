import { useState, useCallback, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { IReduxState } from '../store/reducers';

export function useForceUpdate() {
  const [, setUpdateCount] = useState(0);
  const forceUpdate = useCallback(() => {
    setUpdateCount(prevCount => prevCount + 1);
  }, [setUpdateCount]);
  return forceUpdate;
}

export function useUnmount(callback: () => void) {
  useEffect(() => callback, [callback]);
}

// export const useShallowEqualSelector = curry(flip(useSelector))
export function useShallowEqualSelector<RES>(selector: (state: IReduxState) => RES) {
  return useSelector(selector, shallowEqual);
}
