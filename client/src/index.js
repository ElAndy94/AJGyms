import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://reactnode-env.cypaiqpzpu.eu-west-2.elasticbeanstalk.com/api'
// axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://localhost:8080';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render( app, document.getElementById('root'));

serviceWorker.unregister();
