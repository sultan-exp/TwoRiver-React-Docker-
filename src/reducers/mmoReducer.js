const initialState = {
  transactions: [],
  error: null,
  loading: false,
};

const mmoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_MOBILE_MONEY_TRANSACTIONS_PENDING":
      return { ...state, loading: true };
    case "GET_MOBILE_MONEY_TRANSACTIONS_SUCCESS":
      return { ...state, transactions: payload };
    case "GET_MOBILE_MONEY_TRANSACTIONS_FAILURE":
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default mmoReducer;
