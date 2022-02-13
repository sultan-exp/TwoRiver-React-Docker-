const initialState = {
  transactions_list: null,
  card_summary: {},
  mobile_money_summary: {},
  payouts_summary: {},
  daily_summary: {},
  all_items: {},
  invoice_id_summar: {},
  emails_summary: {},
  promocode_summary: {},
  zip_summary: {},
  sumByWeek: {},
  total_sum: 0,
  avg_ticket_price: 0,
  daily_chart_data: {
    labels: [],
    series: [],
  },
  top3_chart_data: {
    labels: [],
    series: [],
  },
  error: null,
};

const transactionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_TRANSACTIONS_SUCCESS":
      return { ...state, transactions_list: payload };
    case "GET_TRANSACTIONS_FAILURE":
      return { ...state, error: payload };
    case "GET_SERIES_TRANSACTIONS_SUCCESS":
      return { ...state, ...payload };
    case "GET_SERIES_TRANSACTIONS_FAILURE":
      return { ...state, error: payload };
    case "FINALIZE_MOBILE_MONEY_PAYMENT_SUCCESS":
      return { ...state, client_paid_on_phone: true, ...payload };
    case "GET_MERCHANT_PRODUCTS_PENDING":
      return { ...state, client_paid_on_phone: false };
    case "FINALIZE_MOBILE_MONEY_PAYMENT_FAILURE":
      return { ...state, client_paid_on_phone: false, error: payload };
    default:
      return state;
  }
};

export default transactionsReducer;
