import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

// import Index from './Layout/Index';
// import TodoListContainer from './containers/TodoListContainer';

// import { isDev } from './env';

import { store } from './store';
import InitWrapperContainer from './containers/InitWrapperContainer';
import RootRoutes from './routes/RootRoutes';


function App() {
  return (
    <Provider store={store}>
      <InitWrapperContainer>
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
      </InitWrapperContainer>
    </Provider>
  );
}

export default App;
