import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './asset/style/index.scss';
import { IS_DEV } from './util/constants';

ReactDOM.render(React.createElement(App), document.getElementById('root'));

if (IS_DEV) {
  console.log('开发模式');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
