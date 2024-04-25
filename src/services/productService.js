
import axios from '../axios'




const getAllProducts = (inputid) => {
  return axios.get(`/api/get-all-product?id=${inputid}`);
};



const createNewProductService = (data) => {
  return axios.post("/api/create-new-product", data);
};

const deleteProductService = (productid) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: productid,
    },
  });
};

const editProductService = (inputdata) => {
  return axios.put("/api/edit-product", inputdata);
};

export {
  getAllProducts,
  createNewProductService,
  deleteProductService,
  editProductService,
};
