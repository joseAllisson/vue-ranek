import axios from "axios"

const url = "https://ranekapi.origamid.dev/json"

const axiosInstance = axios.create({
  baseURL: `${url}/api`,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const api = {
  get: (endpoint: string) => axiosInstance.get(endpoint),
  post: (endpoint: string, body?: unknown) => axiosInstance.post(endpoint, body),
  put: (endpoint: string, body?: unknown) => axiosInstance.put(endpoint, body),
  delete: (endpoint: string) => axiosInstance.delete(endpoint),
  login: (body: { username: string; password: string }) =>
    axios.post(`${url}/jwt-auth/v1/token`, body),
  validateToken: () => axiosInstance.post(url + "/jwt-auth/v1/token/validate"),
}

export const getCep = (cep: string) => axios.get(`https://viacep.com.br/ws/${cep}/json/`)
