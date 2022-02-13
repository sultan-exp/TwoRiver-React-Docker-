import axios from "axios";
import { baseUrl } from "../config";
import { auth } from "./auth-helper";

export function getOneTimePasscode({ type, pass }) {
  const passField = { string: type, value: { [type]: pass } };
  return (dispatch) => {
    return axios
      .post(`${baseUrl}/auth/${passField.string}/`, passField.value)
      .then((data) => {
        //dispatch action to redux store
        dispatch({
          type: "GENERATE_ONE_TIME_SUCCESS",
          payload: {
            data: data.data,
            loading: false,
          },
        });
        return { data: data.data };
      })
      .catch((err) => {
        dispatch({
          type: "GENERATE_ONE_TIME_FAILURE",
          payload: {
            data: err,
            loading: false,
          },
        });

        return {
          err: Object.values(
            (err.response && err.response.data) || err.message
          ).join(", "),
        };
      });
  };
}

export function getUserAuthToken({ token }) {
  const passField = token ? { string: "token", value: { token } } : false;

  return (dispatch) => {
    return axios
      .post(`${baseUrl}/callback/auth/`, passField.value)
      .then(({ data }) => {
        return axios
          .get(`${baseUrl}/rest-auth/user/`, {
            headers: {
              authorization: `Token ${data.token}`,
            },
          })
          .then((res) => {
            auth.setToken(data.token);
            auth.setUserId(res.data.id);
            auth.setMerchantId(res.data.merchant_id);
            auth.setUserInfo(res.data);
            dispatch({
              type: "RETRIEVE_TOKEN_SUCCESS",
              payload: {
                data: data,
              },
            });
            return { token: data.token };
          });
      })
      .catch((err) => {
        dispatch({
          type: "RETRIEVE_TOKEN_FAILURE",
          payload: {
            data: err,
          },
        });
        const msg =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.token &&
            err.response.data.token.length &&
            err.response.data.token.join(" ")) ||
          err.message;

        return { err: msg };
      });
  };
}

export const onLogout = (showModal) => {
  auth.logout();
  if (showModal) {
    window.location.href = "/login?inactive=show";
  } else {
    window.location.href = "/login";
  }
};

export const handleAuthorizationError = (err) => {
  if (err.response && err.response.status === 401) {
    onLogout();
  }
};

export function getMobileMoneyOTP({ type, phone_number }) {
  // const passField = { string: type, value: { [type]: phone_number } };
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${baseUrl}/user/mmo-auth/`,
      data: {
        phone_number: phone_number,
      },
    })
      .then((data) => {
        //dispatch action to redux store
        dispatch({
          type: "GENERATE_ONE_TIME_SUCCESS",
          payload: {
            data: data.data,
            loading: false,
          },
        });
        return { data: data.data };
      })
      .catch((err) => {
        dispatch({
          type: "GENERATE_ONE_TIME_FAILURE",
          payload: {
            data: err,
            loading: false,
          },
        });

        return {
          err: Object.values(
            (err.response && err.response.data) || err.message
          ).join(", "),
        };
      });
  };
}

export const onLogoutNoRedirect = () => {
  auth.logout();
};
