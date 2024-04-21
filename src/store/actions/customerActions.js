import actionTypes from "./actionTypes";
import {
  getAllCustomer,
  createNewCustomerService,
  deleteCustomerService,
  editCustomerService,
} from "../../services/customerService";

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

export const createNewCustomer = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewCustomerService(data);

      if (res && res.errCode === 0) {
        // toast.success("Create a new user success") //thu vien toastify
        dispatch(saveCustomerSuccess());
        dispatch(fetchAllCustomersStart());
      } else {
        // toast.success("Create a new user arror")
        dispatch(saveCustomerFailed());
      }
    } catch (error) {
      // toast.success("Create a new user arror")
      console.log(error);
    }
  };
};
export const saveCustomerSuccess = () => ({
  type: actionTypes.CREATE_CUSTOMER_SUCCESS,
});
export const saveCustomerFailed = () => ({
  type: actionTypes.CREATE_CUSTOMER_FAILDED,
});

export const deleteCustomer = (customerid) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteCustomerService(customerid);

      if (res && res.errCode === 0) {
        // toast.success("delete a new user success") //thu vien toastify
        dispatch(deleteCustomerSuccess());
        dispatch(fetchAllCustomersStart());
      } else {
        // toast.success("delete a new Supplier error")
        dispatch(deleteCustomerFailed());
      }
    } catch (error) {
      // toast.success("delete a new Supplier error")
      dispatch(deleteCustomerFailed());
      console.log("error", error);
    }
  };
};
export const deleteCustomerSuccess = () => ({
  type: actionTypes.DELETE_CUSTOMER_SUCCESS,
});
export const deleteCustomerFailed = () => ({
  type: actionTypes.DELETE_CUSTOMER_FAILDED,
});

export const editCustomer = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editCustomerService(data);

      if (res && res.errCode === 0) {
        // toast.success("update user success") //thu vien toastify
        dispatch(editCustomerSuccess());
        dispatch(fetchAllCustomersStart());
      } else {
        // toast.success("Edit  user error")
        dispatch(editCustomerFailed());
      }
    } catch (error) {
      // toast.success("Edituser error")
      dispatch(editCustomerFailed());
      console.log("error", error);
    }
  };
};
export const editCustomerSuccess = () => ({
  type: actionTypes.EDIT_CUSTOMER_SUCCESS,
});
export const editCustomerFailed = () => ({
  type: actionTypes.EDIT_CUSTOMER_FAILDED,
});
