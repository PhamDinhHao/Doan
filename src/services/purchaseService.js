import axios from "../axios";

const createNewPurchaseService = (data) => {
  return axios.post("/api/create-new-purchase", data);
};

const createNewPurchaseDetailService = (data) => {
  return axios.post("/api/create-new-purchase-detail", data);
};

const getAllPurchases = (inputid) => {
  return axios.get(`/api/get-all-purchase?id=${inputid}`);
};

// const editProductService = (inputdata) => {
//   console.log("check input", inputdata);
//   return axios.put("/api/edit-product", inputdata);
// };

export {
  createNewPurchaseService,
  createNewPurchaseDetailService,
  getAllPurchases,
};
