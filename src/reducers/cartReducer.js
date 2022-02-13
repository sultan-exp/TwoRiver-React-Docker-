import { reduce } from "lodash";
const initialState = {
  productDetails: null,
  productIds: [],
  quantityById: {}
};

const addProductId = (productIds, productId) => {
  if (productIds.indexOf(productId) !== -1) {
    return productIds;
  }

  return [...productIds, productId];
};

const addQuantityById = (quantityById, productId) => {
  return {
    ...quantityById,
    [productId]: (quantityById[productId] || 0) + 1
  };
};

const updateQuantityById = (quantityById, { productID, qty }) => {
  return {
    ...quantityById,
    [productID]: qty
  };
};

const reduceQuantityById = (quantityById, productId) => {
  return {
    ...quantityById,
    [productId]: quantityById[productId] > 0 ? quantityById[productId] - 1 : 0
  };
};

const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_ORDER_SUCCESS":
      return { ...state, productDetails: payload };
    case "GET_PRODUCT_PENDING":
      return { ...state, loading: true };
    case "GET_PRODUCT_SUCCESS":
      return { ...state, productDetails: payload, loading: false };
    case "GET_PRODUCT_FAILURE":
      return { ...state, error: payload, loading: false };
    case "ADD_TO_CART":
      return {
        ...state,
        productIds: addProductId(state.productIds, payload),
        quantityById: addQuantityById(state.quantityById, payload)
      };
    case "UPDATE_PRODUCT_QTY":
      return {
        ...state,
        productIds: addProductId(state.productIds, payload.productID),
        quantityById: updateQuantityById(state.quantityById, payload)
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        quantityById: reduceQuantityById(state.quantityById, payload)
      };
    case "REMOVE_PRODUCT_FROM_CART":
      return {
        ...state,
        productIds: state.productIds.filter(id => id !== payload),
        quantityById: {
          ...state.quantityById,
          [payload]: 0
        }
      };
    default:
      return state;
  }
};

export const getQuantity = (state, id) => state.quantityById[id];

export const getCartTotal = state => {
  const { cart, misc } = state;
  const { productIds, quantityById } = cart;
  const { variationsById } = misc;

  return reduce(
    productIds,
    (memo, id) => memo + quantityById[id] * variationsById[id].price,
    0
  );
};

export default CartReducer;
