import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import Index from './Layout/Index';
import TodoListContainer from './containers/TodoListContainer';
import { store } from './store';

const Default = () => <div default>选择一个任务</div>;

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Index path="/">
                        <Default default />
                        <TodoListContainer path=":action/:id" />
                    </Index>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
