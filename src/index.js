import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import Inbox from './components/Inbox';
import registerServiceWorker from './registerServiceWorker';
// import 'materialize-css/dist/css/materialize.min.css'
import store from './store'
import { Provider } from 'react-redux'
import { fetchMessages } from './actions'

store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store={store}>
    <Inbox />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
