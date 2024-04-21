import actionTypes from '../actions/actionTypes';

const initialState = {

    suppliers: [],
}

const supplierReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ALL_Supplier_SUCCESS:
            state.suppliers = action.suppliers
            return {
                ...state,

            }
        case actionTypes.DELETE_SUPPLIERFAILDED:
            state.suppliers = []
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default supplierReducer;