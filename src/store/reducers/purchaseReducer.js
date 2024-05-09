import actionTypes from "../actions/actionTypes";

const initialState = {
  purchaseId: null,
  loading: false,
  error: null,
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PURCHASE_SUCCESS:
      return {
        ...state,
        purchaseId: action.payload.purchaseId,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_PURCHASE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default purchaseReducer;
