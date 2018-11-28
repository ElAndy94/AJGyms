import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import { createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import './index.css';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(authReducer);

// axios.defaults.baseURL = 'http://reactnode-env.cypaiqpzpu.eu-west-2.elasticbeanstalk.com/api'
axios.defaults.baseURL = 'http://localhost:3000'

const store = createStore(authReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render( app, document.getElementById('root'));

serviceWorker.unregister();
