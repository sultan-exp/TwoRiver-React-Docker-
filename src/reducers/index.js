import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import miscReducer from "./miscReducer";
import cartReducer from "./cartReducer";
import loginReducer from "./loginReducer";
import locationsReducer from "./locationsReducer";
import transactionsReducer from "./transactionsReducer";
//import payoutsReducer from "./reducers/payoutsReducer";
// import { eventsReducer } from "./views/EventPage/reducers/events";
import mmoReducer from "./mmoReducer";
const reducer = combineReducers({
  routing: routerReducer,
  misc: miscReducer,
  cart: cartReducer,
  transactions: transactionsReducer,
  locations: locationsReducer,
  user_data: loginReducer,
  mmoTransactions: mmoReducer,
});

export default reducer;
