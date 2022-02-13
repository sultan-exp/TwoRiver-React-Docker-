import axios from "axios";
import { baseUrl } from "../config";
// post data for buy ticket
export const buyTicket = patch => dispatch => {
  dispatch({ type: "POST_TICKET_BUY_PENDING" });
  return axios
    .post(`${baseUrl}/pay/`, patch)
    .then(data => {
      //dispatch action to redux store
      dispatch({
        type: "POST_TICKET_BUY_SUCCESS",
        payload: {
          data: data
        }
      });
      return data.data;
    })
    .catch(err => {
      dispatch({
        type: "POST_TICKET_BUY_FAILURE",
        payload: {
          data: err
        }
      });
    });
};

export const getOrderInfo = (productID = 1) => async dispatch => {
  dispatch({ type: "GET_ORDER_PENDING" });
  return axios
    .get(`${baseUrl}/store/product/${productID}`)
    .then(({ data }) => {
      //dispatch action to redux store
      dispatch({
        type: "GET_ORDER_SUCCESS",
        payload: data
      });
      return data;
    })
    .catch(err => {
      dispatch({
        type: "GET_ORDER_FAILURE",
        payload: {
          data: err
        }
      });
    });
};

export const getPublicProductDetails = (productID = 1) => async dispatch => {
  dispatch({ type: "GET_PRODUCT_PENDING" });
  return axios
    .get(`${baseUrl}/store/item/${productID}`)
    .then(({ data }) => {
      //dispatch action to redux store
      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: data
      });
      return data;
    })
    .catch(err => {
      dispatch({
        type: "GET_PRODUCT_FAILURE",
        payload: {
          data: err
        }
      });
    });
};

export const addProductToCart = productID => dispatch =>
  dispatch({ type: "ADD_TO_CART", payload: productID });

export const removeItemFromCart = productId => dispatch =>
  dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: productId });

export const removeProductFromCart = productId => dispatch =>
  dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: productId });

export const updateProductQty = (productID, qty) => dispatch =>
  dispatch({ type: "UPDATE_PRODUCT_QTY", payload: { productID, qty } });
