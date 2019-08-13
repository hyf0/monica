import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Index from './Layout/Index';
// import TodoListContainer from './containers/TodoListContainer';

import { store, persistor } from './store';

function App() {
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
