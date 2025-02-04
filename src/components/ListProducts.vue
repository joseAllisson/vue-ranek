<script lang="ts">
import { api } from "@/services"

export default {
  data() {
    return {
      products: null,
    }
  },
  methods: {
    async getProducts() {
      try {
        api.get("/produto").then((response) => {
          this.products = response.data
        })
      } catch (error) {
        console.error("Erro ao buscar Produtos:", error)
      }
    },
  },
  created() {
    this.getProducts()
  },
}
</script>

<template>
  <section class="product-container">
    <div v-for="product in products" :key="product.id">
      <img v-if="product.fotos" :src="product.fotos[0]" :alt="product.fotos[0].titulo" />
      <p class="preco">{{ product.preco }}</p>
      <h2 class="titulo">{{ product.nome }}</h2>
      <p>{{ product.descricao }}</p>
    </div>
  </section>
</template>

<style lang=""></style>
