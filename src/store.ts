import { defineStore } from "pinia"
import { api } from "@/services"
import type { Product } from "./interfaces/Product"
import type { User } from "./interfaces/User"

export const useGlobalStore = defineStore("global", {
  state: () => ({
    isLoggedIn: false,
    user: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    userProducts: null as Product[] | null, // Para armazenar os produtos do usuário
  }),

  actions: {
    // Atualiza status de login
    updateLogin(value: boolean) {
      this.isLoggedIn = value
    },

    // Atualiza os dados do usuário
    updateUser(data: Partial<typeof this.user>) {
      this.user = { ...this.user, ...data }
    },

    // Atualiza os produtos do usuário
    updateUserProducts(products: Product[]) {
      this.userProducts = products
    },

    // Adiciona um novo produto no início da lista
    addUserProduct(product: Product) {
      if (this.userProducts) {
        this.userProducts.unshift(product)
      } else {
        this.userProducts = [product]
      }
    },

    // Busca os produtos do usuário
    async fetchUserProducts() {
      const response = await api.get(`/produto?usuario_id=${this.user.id}`)
      this.updateUserProducts(response.data)
      return response
    },

    // Busca os dados do usuário
    async fetchUser() {
      const response = await api.get("/usuario")
      this.updateUser(response.data)
      this.updateLogin(true)
    },

    // Criação de usuário
    async createUser(payload: User) {
      this.updateUser({ id: payload.email })
      return api.post("/usuario", payload)
    },

    // Login do usuário
    async loginUser(email: string, password: string) {
      const response = await api.login({
        username: email,
        password: password,
      })
      window.localStorage.token = `${response.data.token}`
    },

    // Logout do usuário
    logoutUser() {
      this.updateUser({
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      })
      window.localStorage.removeItem("token")
      this.updateLogin(false)
    },
  },
})
