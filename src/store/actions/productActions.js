import actionTypes from "./actionTypes";
import { getAllProducts } from "../../services/productService";

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
