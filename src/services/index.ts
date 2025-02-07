import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://ranekapi.origamid.dev/json/api"
});

export const api = axiosInstance;
