/*
 * This reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 */

const defaultState = {
  user_info: {
    loading: false
  }
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GENERATE_ONE_TIME_SUCCESS":
      return Object.assign({}, state, {
        one_time_code_resp: action.payload.data,
        loading: action.loading
      });

    case "GENERATE_ONE_TIME_FAILURE":
      return Object.assign({}, state, { loading: action.loading });

    case "RETRIEVE_TOKEN_SUCCESS":
      return Object.assign({}, state, {
        auth_token: action.payload.data,
        loading: action.loading
      });

    case "RETRIEVE_TOKEN_FAILURE":
      return state;

    case "POST_LOGOUT_FAILURE":
      return state;

    case "POST_LOGOUT_PENDING":
      return state;

    case "POST_LOGOUT_SUCCESS":
      return Object.assign({}, state, {
        logout: action.payload
      });

    default:
      return state;
  }
};

export default usersReducer;
