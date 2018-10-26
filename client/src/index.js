import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://localhost:8080';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.interceptors.request.use(request => {
//   // console.log(request);
//   // Edit request config
//   return request;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//   // console.log(response);
//   // Edit request config
//   return response;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

ReactDOM.render( app, document.getElementById('root'));

serviceWorker.unregister();
