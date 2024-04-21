import actionTypes from "../actions/actionTypes";

const initialState = {
  customers: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_Customer_SUCCESS:
      state.customers = action.customers;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_Customer_FAILED:
      state.customers = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default customerReducer;
