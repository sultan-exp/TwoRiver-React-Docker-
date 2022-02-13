import axios from "axios";
import { baseUrl } from "../config";

export const pickupLocations = () => async (dispatch) => {
  dispatch({ type: "GET_LOCATIONS_PENDING" });
  return axios({
    url: `${baseUrl}/mobile-money/pickup-locations`,
    method: "get",
  })
    .then(async ({ data }) => {
      let results = [];
      results = data.results;
      let res = data;
      while (res.next != null) {
        res = await loadMore(res.next);
        results = results.concat(res.results);
        res.results = results;
        dispatch({
          type: "GET_LOCATIONS_SUCCESS",
          payload: res,
        });
        return;
      }

      dispatch({
        type: "GET_LOCATIONS_SUCCESS",
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: "GET_LOCATIONS_FAILURE",
        payload: {
          data: err,
        },
      });
    });
};

const loadMore = (url) => {
  return axios({
    url: url,
    method: "get",
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const makeMobileMoneyPayment = (payload) => async (dispatch) => {
  dispatch({ type: "MAKE_MOBILE_MONEY_PAYMENT_PENDING" });
  return axios
    .post(`${baseUrl}/mobile-money/charge/`, payload)
    .then((res) => {
      dispatch({
        type: "MAKE_MOBILE_MONEY_PAYMENT_SUCCESS",
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: "MAKE_MOBILE_MONEY_PAYMENT_FAILURE",
        payload: {
          data: err,
        },
      });
      throw err;
    });
};

// get event data from api according id
export function finalizeMobileMoneyPayment(transaction_id) {
  return (dispatch) => {
    dispatch({ type: "FINALIZE_MOBILE_MONEY_PAYMENT_PENDING" });
    //PS any request missing the final / will be blocked by cors
    axios
      .get(`${baseUrl}/mobile-money/charge/` + transaction_id + `/`)
      .then(async (data) => {
        //dispatch action to redux store
        if (data.data.customer_successfully_paid == 1) {
          dispatch({
            type: "FINALIZE_MOBILE_MONEY_PAYMENT_SUCCESS",
            payload: {
              data: data.data,
            },
          });
          return data.data;
        } else {
          setTimeout(() => {
            dispatch(finalizeMobileMoneyPayment(transaction_id));
          }, 3000);
        }
      })
      .catch((err) => {
        dispatch({
          type: "FINALIZE_MOBILE_MONEY_PAYMENT_FAILURE",
          payload: {
            data: err,
          },
        });
      });
  };
}
