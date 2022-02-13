import { mergeWith, isArray, forEach } from "lodash";
const initialState = {
  showToaster: false,
  fastAndSecureText: null,
  monthlyFeesText: null,
  contactEnquiry: null,
  merchantInfo: null,
  merchantProducts: null,
  loading: true,
  MerchantProductPageLoading: true,
  merchantProduct: null,
  productsById: {},
  variationsById: {}
};

const productsById = (productById, products) => {
  const normalized = products.reduce((obj, product) => {
    obj[product.id] = product;
    return obj;
  }, {});

  return mergeWith({}, productById, normalized, (merged, sourceValue) => {
    if (isArray(merged) && isArray(sourceValue)) {
      return sourceValue;
    }
    return undefined;
  });
};

const productsVariationById = (state, products) => {
  const productById = products.reduce((obj, product) => {
    forEach(product.product_variations, variation => {
      obj[variation.pk] = variation;
    });
    return obj;
  }, {});

  return mergeWith({}, productById, state, (merged, sourceValue) => {
    if (isArray(merged) && isArray(sourceValue)) {
      return sourceValue;
    }
    return undefined;
  });
};

const MiscReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SIGNUP_STEP_ONE": {
      return { ...state, showToaster: true };
    }
    case "SIGNUP_TOASTER_SHOWN": {
      return { ...state, showToaster: false };
    }
    case "FAST_AND_SECURE_TEXT":
      return { ...state, fastAndSecureText: payload };
    case "MONTHLY_FEES_TEXT":
      return { ...state, monthlyFeesText: payload };
    case "CONTACT_ENQUIRY":
      return { ...state, contactEnquiry: payload };
    case "MERCHANT_INFO":
      return { ...state, merchantInfo: payload };
    case "GET_MERCHANT_PRODUCTS_PENDING":
      return { ...state, loading: true };
    case "GET_MERCHANT_PRODUCTS_SUCCESS":
      return {
        ...state,
        merchantProducts: payload,
        productsById: productsById(state.productById, payload.results),
        variationsById: productsVariationById(
          state.variationsById,
          payload.results
        ),
        loading: false
      };
    case "GET_MERCHANT_PRODUCTS_FAILURE":
      return { ...state, error: payload, loading: false };
    case "GET_MERCHANT_PRODUCT_PENDING":
      return { ...state, merchantProductPageLoading: true };

    case "ACCOUNT_UPDATE_SUCCESS":
      return { ...state, accountInfo: payload, loading: false };
    case "ACCOUNT_UPDATE_FAILURE":
      return { ...state, error: payload, loading: false };
    case "ACCOUNT_UPDATE_PENDING":
      return { ...state, loading: true };

    case "GET_MERCHANT_PRODUCT_SUCCESS":
      return {
        ...state,
        merchantProduct: payload,
        merchantProductPageLoading: false
      };
    case "GET_MERCHANT_PRODUCT_FAILURE":
      return {
        ...state,
        merchantProduct: payload,
        merchantProductPageLoading: false
      };
    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        variationsById: productsVariationById(state.variationsById, [payload]),
        productsById: productsById(state.productById, [payload])
      };
    default:
      return state;
  }
};

export const getProduct = (state, id) => state.productsById[id];

export default MiscReducer;
