import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import Index from './Layout/Index';
// import TodoListContainer from './containers/TodoListContainer';

// import { isDev } from './env';

import { store } from './store';
import InitWrapperContainer from './containers/InitWrapperContainer';

function App() {
  return (
    <Provider store={store}>
      <InitWrapperContainer>
        <Router>
          <Route path="/" component={Index} />
        </Router>
      </InitWrapperContainer>
    </Provider>
  );
}

export default App;
