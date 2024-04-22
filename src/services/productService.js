import axios from "axios";

const getAllProducts = (inputid) => {
  return axios.get(`/api/get-all-product?id=${inputid}`);
};

export {
  getAllProducts,
  // createNewCustomerService,
  // deleteCustomerService,
  // editCustomerService,
};
