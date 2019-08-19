import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Index from './Layout/Index';
// import TodoListContainer from './containers/TodoListContainer';

import { isDev } from './env';

import { store, persistor } from './store';

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
      <PersistGate persistor={persistor} loading={<div>loding...</div>}>
        <Router>
          <Route path="/" component={Index} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
