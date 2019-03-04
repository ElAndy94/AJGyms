import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.scss';
import authReducer from './store/reducers/auth';
import classesReducer from './store/reducers/classes';

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

axios.defaults.baseURL =
  'http://reactnode-env.cypaiqpzpu.eu-west-2.elasticbeanstalk.com/';
// axios.defaults.baseURL = 'http://localhost:3000'

const rootReducer = combineReducers({
  auth: authReducer,
  classes: classesReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
// registerServiceWorker();
