<template>
  <div class="product" v-if="product">
    <router-link class="product-img" :to="{ name: 'product', params: { id: product.id } }">
      <!-- <div class="product-img"> -->
      <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo" />
      <!-- </div> -->
    </router-link>
    <div class="info">
      <div class="product-info">
        <h2 class="titulo">{{ product.nome }}</h2>
        <p class="preco">{{ formattedPrice(product.preco) }}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { type Product } from "@/interfaces/Product"
import { defineComponent } from "vue"
import { formattedPrice } from "@/helpers/formattedPrice"

export default defineComponent({
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  methods: {
    formattedPrice,
  },
})
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

@media screen and (max-width: 600px) {
  .product {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
