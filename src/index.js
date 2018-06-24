import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';

import './index.css';

const store = configureStore();
window.onerror = (msg, url, line) => {
  console.log('.onerror(): ' + msg + '\nurl: ' + url + '\nline: ' + line);
  //return true;
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);