import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { set } from "lodash";
import reducer from "./reducers";
import axios from "axios";
import { auth } from "./actions/auth-helper";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const accessToken = (store) => (next) => (action) => {
  if (auth.loggedIn()) {
    axios.defaults.headers.common["authorization"] = "Token " + auth.getToken();
    // axios.defaults.headers['merchant_id'] = window.localStorage.getItem('merchant_id');
  }
  //axios.defaults.headers.common['authorization'] = store.getState().auth.token ? store.getState().auth.token : null;

  return next(action);
};

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("search.paycruiser.com")) {
      set(config, "headers.authorization", "");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, accessToken))
);

export default store;
