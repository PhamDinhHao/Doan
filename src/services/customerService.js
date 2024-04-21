import axios from "../axios";
const getAllCustomer = (inputid) => {
  return axios.get(`/api/get-all-customer?id=${inputid}`);
};

export { getAllCustomer };
