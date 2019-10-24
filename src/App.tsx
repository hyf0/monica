import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import './App.scss';
import { userEffects, projectEffects } from './store/effects';
import { AppRoute } from './route';
// import { IReduxState } from './store/reducers';
// import { useShallowEqualSelector } from './util/hooks';
import { getLocalJWT } from './util/helper';
import { useIsLogined } from './hook';

// const appSelector = ({ user: {user} }: IReduxState) => ({
//   isLogined: user !== null,
// });

function App() {

  const isLogined = useIsLogined();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogined) {
      const jwt = getLocalJWT();
      if (jwt != null && jwt !== '') {
        dispatch(userEffects.login());
      }
    } else {
      dispatch(projectEffects.getProjects());
    }
  }, [dispatch, isLogined]);

  return (
    <div className="app">
      <HashRouter>
        <AppRoute />
      </HashRouter>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
