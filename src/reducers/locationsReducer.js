const initialState = {
  locations: [],
  error: null,
};

const locationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_LOCATIONS_SUCCESS":
      return { ...state, locations: payload };
    case "GET_LOCATIONS_FAILURE":
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default locationsReducer;
