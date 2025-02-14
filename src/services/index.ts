import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://ranekapi.origamid.dev/json/api"
});

export const api = axiosInstance;

export function getCep(cep: string) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
