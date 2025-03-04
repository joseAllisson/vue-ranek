import { defineStore } from "pinia"
import { api } from "@/services"
import type { Produto } from "./interfaces/Produto"
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
    userProducts: null as Produto[] | null, // Para armazenar os produtos do usuário
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
    updateUserProducts(products: Produto[]) {
      this.userProducts = products
    },

    // Adiciona um novo produto no início da lista
    addUserProduct(product: Produto) {
      if (this.userProducts) {
        this.userProducts.unshift(product)
      } else {
        this.userProducts = [product]
      }
    },

    // Busca os produtos do usuário
    async fetchUserProducts() {
      try {
        const response = await api.get(`/produto?usuario_id=${this.user.id}`)
        this.updateUserProducts(response.data)
      } catch (error) {
        console.error("Error fetching user products:", error)
      }
    },

    // Busca os dados do usuário
    async fetchUser() {
      try {
        const response = await api.get("/usuario")
        this.updateUser(response.data)
        console.log("User fetched aqui:", response.data)
        this.updateLogin(true)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    },

    // Criação de usuário
    async createUser(payload: User) {
      this.updateUser({ id: payload.email })
      return api.post("/usuario", payload)
    },

    // Login do usuário
    async loginUser(email: string, password: string) {
      try {
        const response = await api.login({
          username: email,
          password: password,
        })
        window.localStorage.token = `${response.data.token}`
      } catch (error) {
        console.error("Error logging in:", error)
      }
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
