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

export {
  createNewPurchaseService,
  createNewPurchaseDetailService,
  getAllPurchases,
};
