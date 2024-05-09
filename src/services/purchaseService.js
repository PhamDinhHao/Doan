import axios from "../axios";

const createNewPurchaseService = (data) => {
  return axios.post("/api/create-new-purchase", data);
};

const createNewPurchaseDetailService = (data) => {
  return axios.post("/api/create-new-purchase-detail", data);
};

export { createNewPurchaseService, createNewPurchaseDetailService };
