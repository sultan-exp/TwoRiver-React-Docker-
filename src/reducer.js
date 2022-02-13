import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import loginReducer from "./reducers/loginReducer";
import transactionsReducer from "./reducers/transactionsReducer";

const reducer = combineReducers({
  routing: routerReducer,
  user_data: loginReducer,
  transactions: transactionsReducer,
});

export default reducer;
