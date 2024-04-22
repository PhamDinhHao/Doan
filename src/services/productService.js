import axios from "../axios";

const getAllProducts = (inputid) => {
  return axios.get(`/api/get-all-product?id=${inputid}`);
};

const createNewProductService = (data) => {
  return axios.post("/api/create-new-product", data);
};

export {
  getAllProducts,
  createNewProductService,
  // deleteCustomerService,
  // editCustomerService,
};
