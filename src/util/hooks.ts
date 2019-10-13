import { useState, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { curry, flip } from 'ramda';
import { IReduxState } from '../store/reducers';

export function useForceUpdate() {
  const [, setUpdateCount] = useState(0);
  const forceUpdate = useCallback(() => {
    setUpdateCount(prevCount => prevCount + 1);
  }, [setUpdateCount]);
  return forceUpdate;
}

// export const useShallowEqualSelector = curry(flip(useSelector))
export function useShallowEqualSelector<RES>(selector: (state: IReduxState) => RES) {
  return useSelector(selector, shallowEqual);
}
