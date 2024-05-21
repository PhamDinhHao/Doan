import axios from "../axios";
const getAllHistorySale = () => {
    return axios.get(`http://localhost:8080/api/total-sales-by-day`);
};
const getAllHistoryPurchase = () => {
    return axios.get(`http://localhost:8080/api/total-purchase-by-day`);
};
export {
    getAllHistorySale,
    getAllHistoryPurchase
};
