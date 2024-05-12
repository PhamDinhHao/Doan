const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //supplier
  FETCH_ALL_Supplier_SUCCESS: "FETCH_ALL_Supplier_SUCCESS",
  FETCH_ALL_Supplier_FAILED: "FETCH_ALL_Supplier_FAILED",
  DELETE_SUPPLIER_SUCCESS: "DELETE_SUPPLIER_SUCCESS",
  DELETE_SUPPLIERFAILDED: "DELETE_SUPPLIERFAILDED",
  CREATE_SUPPLIER_SUCCESS: "CREATE_SUPPLIER_SUCCESS",
  CREATE_SUPPLIERFAILDED: "CREATE_SUPPLIERFAILDED",
  EDIT_SUPPLIER_SUCCESS: "EDIT_SUPPLIER_SUCCESS",
  EDIT_SUPPLIERFAILDED: "EDIT_SUPPLIERFAILDED",
  FETCH_SUPPLIER_SUGGESTIONS_REQUEST: "FETCH_SUPPLIER_SUGGESTIONS_REQUEST",
  FETCH_SUPPLIER_SUGGESTIONS_SUCCESS: "FETCH_SUPPLIER_SUGGESTIONS_SUCCESS",
  FETCH_SUPPLIER_SUGGESTIONS_FAILURE: "FETCH_SUPPLIER_SUGGESTIONS_FAILURE",

  //cutomer
  FETCH_ALL_Customer_SUCCESS: "FETCH_ALL_Customer_SUCCESS",
  FETCH_ALL_Customer_FAILED: "FETCH_ALL_Customer_FAILED",
  DELETE_CUSTOMER_SUCCESS: "DELETE_CUSTOMER_SUCCESS",
  DELETE_CUSTOMER_FAILDED: "DELETE_CUSTOMER_FAILDED",
  CREATE_CUSTOMER_SUCCESS: "CREATE_CUSTOMER_SUCCESS",
  CREATE_CUSTOMER_FAILDED: "CREATE_CUSTOMER_FAILDED",
  EDIT_CUSTOMER_SUCCESS: "EDIT_CUSTOMER_SUCCESS",
  EDIT_CUSTOMER_FAILDED: "EDIT_CUSTOMER_FAILDED",
  FETCH_CUSTOMER_SUGGESTIONS_REQUEST: "FETCH_CUSTOMER_SUGGESTIONS_REQUEST",
  FETCH_CUSTOMER_SUGGESTIONS_SUCCESS: "FETCH_CUSTOMER_SUGGESTIONS_SUCCESS",
  FETCH_CUSTOMER_SUGGESTIONS_FAILURE: "FETCH_CUSTOMER_SUGGESTIONS_FAILURE",

  //product
  FETCH_ALL_PRODUCTS_SUCCESS: "FETCH_ALL_PRODUCTS_SUCCESS",
  FETCH_ALL_PRODUCTS_FAILED: "FETCH_ALL_PRODUCTS_FAILED",
  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
  CREATE_PRODUCT_FAILDED: "CREATE_PRODUCT_FAILDED",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILDED: "DELETE_PRODUCT_FAILDED",
  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_FAILDED: "EDIT_PRODUCT_FAILDED",
  FETCH_PRODUCT_SUGGESTIONS_REQUEST: "FETCH_PRODUCT_SUGGESTIONS_REQUEST",
  FETCH_PRODUCT_SUGGESTIONS_SUCCESS: "FETCH_PRODUCT_SUGGESTIONS_SUCCESS",
  FETCH_PRODUCT_SUGGESTIONS_FAILURE: "FETCH_PRODUCT_SUGGESTIONS_FAILURE",

  //purchase
  CREATE_PURCHASE_SUCCESS: "CREATE_PURCHASE_SUCCESS",
  CREATE_PURCHASE_FAILED: "CREATE_PURCHASE_FAILED",
  CREATE_PURCHASE_DETAIL_SUCCESS: "CREATE_PURCHASE_DETAIL_SUCCESS",
  CREATE_PURCHASE_DETAIL_FAILED: "CREATE_PURCHASE_DETAIL_FAILED",

  //sale
  CREATE_SALE_SUCCESS: "CREATE_SALE_SUCCESS",
  CREATE_SALE_FAILED: "CREATE_SALE_FAILED",
  CREATE_SALE_DETAIL_SUCCESS: "CREATE_SALE_DETAIL_SUCCESS",
  CREATE_SALE_DETAIL_FAILED: "CREATE_SALE_DETAIL_FAILED",
});

export default actionTypes;