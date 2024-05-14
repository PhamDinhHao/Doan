import actionTypes from "./actionTypes";
import {
    createNewSaleService,
    createNewSaleDetailService,
} from "../../services/saleService";

export const createNewSale = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSaleService(data);

            if (res && res.errCode === 0) {
                dispatch(saveSaleSuccess(res.saleId));
            } else {
                dispatch(saveSaleFailed());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const saveSaleSuccess = (saleId) => ({
    type: actionTypes.CREATE_SALE_SUCCESS,
    payload: { saleId },
});

export const saveSaleFailed = (error) => ({
    type: actionTypes.CREATE_SALE_FAILED,
    payload: { error },
});

export const createNewSaleDetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSaleDetailService(data);
            if (res && res.errCode === 0) {
                dispatch(saveSaleDetailSuccess());
            } else {
                dispatch(saveSaleDetailFailed());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const saveSaleDetailSuccess = () => ({
    type: actionTypes.CREATE_SALE_DETAIL_SUCCESS,
});

export const saveSaleDetailFailed = (error) => ({
    type: actionTypes.CREATE_SALE_DETAIL_FAILED,
    payload: { error },
});