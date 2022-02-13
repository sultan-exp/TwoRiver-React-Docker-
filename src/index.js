import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';


// Styles
import './index.css';
import "toastr/build/toastr.css";


import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import hist from './history';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
