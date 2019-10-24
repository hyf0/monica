import { useSelector } from 'react-redux';

import { IReduxState } from "../store/reducers";



export const useIsLogined = (function createUseIsLogin() {
  const useIsLoginSelector = ({ user: { user } }: IReduxState) => user != null;
  return function useIsLogin() {
    return useSelector(useIsLoginSelector);
  }
}());
