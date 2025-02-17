<template>
  <div class="product" v-if="product">
    <router-link class="product-img" :to="{name: 'produto', params: {id: product.id}}">
      <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo">
    </router-link>
    <div class="info">
      <p class="preco">{{formattedPrice(product.preco)}}</p>
      <h2 class="titulo">{{product.nome}}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { type Produto } from "@/interfaces/Produto";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    product: {
      type: Object as () => Produto,
      required: true
    }
  }
});
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}

.info {
  align-self: end;
}

.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
