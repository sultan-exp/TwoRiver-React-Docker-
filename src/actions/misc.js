import axios from "axios";
import {
  MONTHLY_FEES_TEXT,
  CONTACT_ENQUIRY,
  SIGNUP_STEP_ONE,
  FAST_AND_SECURE_TEXT,
  MERCHANT_INFO,
} from "../constants";
import { baseUrl } from "../config";
import { auth } from "./auth-helper";
import { handleAuthorizationError, onLogout } from "./login";

export const getFastSecText = () => (dispatch) => {
  try {
    dispatch({
      type: FAST_AND_SECURE_TEXT,
      payload: "list",
    });
  } catch (e) {
    console.log("error occured dispatching", e);
  }
};

export const getMonthlyFeesText = () => (dispatch) => {
  try {
    dispatch({
      type: MONTHLY_FEES_TEXT,
      payload: "list",
    });
  } catch (e) {
    console.log("error occured dispatching", e);
  }
};

export const submitContactForm = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/webreg/`, {
      ...data,
    });
    dispatch({
      type: CONTACT_ENQUIRY,
      payload: response.data.message,
    });
  } catch (e) {
    console.log(e);
  }
};

export const signUpStepOne = (data) => async (dispatch) => {
  let valid_status_codes = [200, 202, 203];
  const response = await axios.post(`${baseUrl}/user/signup-step-one/`, {
    ...data,
  });

  if (
    !valid_status_codes.includes(response.data.status_code) &&
    response.data.errors &&
    response.data.errors.length > 0
  ) {
    const msg = response.data.errors.join("/n");
    throw new Error(msg);
  }
  dispatch({
    type: SIGNUP_STEP_ONE,
    payload: response.data.message,
  });
};

export function UpdateMerchantInfo(payload) {
  return (dispatch) => {
    return axios
      .put(`${baseUrl}/user/update-acct-info/`, payload)
      .then((data) => {
        dispatch({
          type: "ACCOUNT_UPDATE_SUCCESS",
          payload: {
            data: data.data,
            loading: false,
          },
        });
        return { data: data.data };
      })
      .catch((err) => {
        dispatch({
          type: "ACCOUNT_UPDATE_FAILURE",
          payload: {
            data: err,
            loading: false,
          },
        });
        return err;
      });
  };
}

export const getMerchantInfo = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/rest-auth/user/`, {
      headers: {
        authorization: `Token ${auth.getToken()}`,
      },
    });
    dispatch({
      type: MERCHANT_INFO,
      payload: response.data,
    });
    return { data: response.data };
  } catch (err) {
    handleAuthorizationError(err);
  }
};

export const validateToken = () => (dispatch) => {
  axios
    .get(`${baseUrl}/rest-auth/user/`, {
      headers: {
        authorization: `Token ${auth.getToken()}`,
      },
    })
    .then((response) => {
      const {
        is_active,
        mobile_verified,
        government_id_verified,
        business_verified,
      } = response.data;
      if (
        !is_active ||
        !mobile_verified ||
        !government_id_verified ||
        !business_verified
      ) {
        auth.logout();
        onLogout(true);
      }
      dispatch({
        type: MERCHANT_INFO,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        auth.logout();
      }
    });
};

export const getConnectedUserProducts = () => async (dispatch) => {
  dispatch({ type: "GET_MERCHANT_PRODUCTS_PENDING" });
  return axios({
    url: `${baseUrl}/store/productsapi/`,
    method: "get",
  })
    .then(({ data }) => {
      //dispatch action to redux store
      dispatch({
        type: "GET_MERCHANT_PRODUCTS_SUCCESS",
        payload: data,
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: "GET_MERCHANT_PRODUCTS_FAILURE",
        payload: {
          data: err,
        },
      });

      handleAuthorizationError(err);
    });
};

export const getConnectedUserProductDetails =
  (productID = 1) =>
  async (dispatch) => {
    dispatch({ type: "GET_MERCHANT_PRODUCT_PENDING" });
    return axios
      .get(`${baseUrl}/store/productsapi/?id=${productID}`)
      .then(({ data }) => {
        //dispatch action to redux store
        dispatch({
          type: "GET_MERCHANT_PRODUCT_SUCCESS",
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        dispatch({
          type: "GET_MERCHANT_PRODUCT_FAILURE",
          payload: {
            data: err,
          },
        });
      });
  };

// export const toasterShown = () => ({type: "SIGNUP_TOASTER_SHOWN"})
