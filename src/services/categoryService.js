import axios from "../axios";
const getAllCategory = (inputid) => {
    return axios.get(`/api/get-all-category?id=${inputid}`);
};

const createNewCategoryrService = (data) => {
    return axios.post("/api/create-new-category", data);
};



export {
    getAllCategory,
    createNewCategoryrService,

};
