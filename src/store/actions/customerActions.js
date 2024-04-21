import actionTypes from "./actionTypes";
import { getAllCustomer } from "../../services/customerService";

export const fetchAllCustomersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCustomer("ALL");
      console.log("res", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllCustomersSuccess(res.customers.reverse())); ///reverse giup dao nguoc mang
      } else {
        // toast.success("Fetch all Suppplier error")
        dispatch(fetchAllCustomersFailed());
      }
    } catch (error) {
      // toast.success("Fetch all Suppplier error")
      dispatch(fetchAllCustomersFailed());
      console.log(error);
    }
  };
};

export const fetchAllCustomersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_Customer_SUCCESS,
  customers: data,
});
export const fetchAllCustomersFailed = () => ({
  type: actionTypes.FETCH_ALL_Customer_FAILED,
});
