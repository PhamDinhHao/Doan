import actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
      state.products = action.products;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_PRODUCTS_FAILED:
      state.products = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default productReducer;
