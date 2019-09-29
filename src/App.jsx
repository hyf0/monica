import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLocalJWT } from './utils';
import { userActions } from './store/actions';

import RootRoutes from './routes/RootRoutes';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // 自动登录
    const jwt = getLocalJWT();
    if (jwt === '' || jwt == null) return;
    dispatch(userActions.effectLoginByJWT());
  }, []);

  return (
    <div
      id="app-main"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Router>
        <RootRoutes />
      </Router>
    </div>
  );
}

export default App;
