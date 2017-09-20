import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import Inbox from './components/inbox';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
// import 'materialize-css/dist/css/materialize.min.css'
import store from './store'
import { fetchMessages } from './actions'

store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store={store}>
    <Inbox/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
