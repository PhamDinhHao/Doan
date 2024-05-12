import axios from "../axios";

const createNewSaleService = (data) => {
    return axios.post("/api/create-new-sale", data);
};

const createNewSaleDetailService = (data) => {
    return axios.post("/api/create-new-sale-detail", data);
};

export { createNewSaleService, createNewSaleDetailService };