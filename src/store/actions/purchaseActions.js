import actionTypes from "./actionTypes";
import {
  createNewPurchaseService,
  createNewPurchaseDetailService,
} from "../../services/purchaseService";

export const createNewPurchase = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewPurchaseService(data);
      // console.log("id", res.purchaseId);
      if (res && res.errCode === 0) {
        dispatch(savePurchaseSuccess(res.purchaseId));
      } else {
        dispatch(savePurchaseFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const savePurchaseSuccess = (purchaseId) => ({
  type: actionTypes.CREATE_PURCHASE_SUCCESS,
  payload: { purchaseId },
});

export const savePurchaseFailed = (error) => ({
  type: actionTypes.CREATE_PURCHASE_FAILED,
  payload: { error },
});

export const createNewPurchaseDetail = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewPurchaseDetailService(data);
      if (res && res.errCode === 0) {
        dispatch(savePurchaseDetailSuccess());
      } else {
        dispatch(savePurchaseDetailFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const savePurchaseDetailSuccess = () => ({
  type: actionTypes.CREATE_PURCHASE_DETAIL_SUCCESS,
});

export const savePurchaseDetailFailed = (error) => ({
  type: actionTypes.CREATE_PURCHASE_DETAIL_FAILED,
  payload: { error },
});
