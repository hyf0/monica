import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import Index from './Layout/Index';
// import TodoListContainer from './containers/TodoListContainer';

import { isDev } from './env';

import { store } from './store';

function App() {
  if (isDev) {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={Index} />
        </Router>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Index} />
      </Router>
    </Provider>
  );
}

export default App;
