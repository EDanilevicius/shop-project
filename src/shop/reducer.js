const DEFAULT_STATE = {
  products: [],
  error: null,
  loading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, loading: true };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
