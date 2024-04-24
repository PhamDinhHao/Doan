<<<<<<< HEAD
import axios from '../axios'
=======
import axios from "../axios";
>>>>>>> 40b3942c1dba7473dd9903f3f459efe4ffd8ba32

const getAllProducts = (inputid) => {
  return axios.get(`/api/get-all-product?id=${inputid}`);
};

<<<<<<< HEAD
=======
const createNewProductService = (data) => {
  return axios.post("/api/create-new-product", data);
};
>>>>>>> 40b3942c1dba7473dd9903f3f459efe4ffd8ba32

export {
  getAllProducts,
  createNewProductService,
  // deleteCustomerService,
  // editCustomerService,
};
