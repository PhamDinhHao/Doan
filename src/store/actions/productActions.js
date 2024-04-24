import actionTypes from "./actionTypes";
import {
  getAllProducts,
  createNewProductService,
} from "../../services/productService";

export const fetchAllProductsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllProducts("ALL");
      console.log("res", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllProductsSuccess(res.products.reverse())); ///reverse giup dao nguoc mang
      } else {
        // toast.success("Fetch all Suppplier error")
        dispatch(fetchAllProductsFailed());
      }
    } catch (error) {
      // toast.success("Fetch all Suppplier error")
      dispatch(fetchAllProductsFailed());
      console.log(error);
    }
  };
};

export const fetchAllProductsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
  products: data,
});
export const fetchAllProductsFailed = () => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_FAILED,
});

export const createNewProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewProductService(data);

      if (res && res.errCode === 0) {
        // toast.success("Create a new user success") //thu vien toastify
        dispatch(saveProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        // toast.success("Create a new user arror")
        dispatch(saveProductFailed());
      }
    } catch (error) {
      // toast.success("Create a new user arror")
      console.log(error);
    }
  };
};
export const saveProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});
export const saveProductFailed = () => ({
  type: actionTypes.CREATE_PRODUCT_FAILDED,
});
