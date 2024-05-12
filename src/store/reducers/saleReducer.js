import actionTypes from "../actions/actionTypes";

const initialState = {
    saleId: null,
    loading: false,
    error: null,
};

const saleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SALE_SUCCESS:
            return {
                ...state,
                saleId: action.payload.saleId,
                loading: false,
                error: null,
            };
        case actionTypes.CREATE_SALE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default saleReducer;