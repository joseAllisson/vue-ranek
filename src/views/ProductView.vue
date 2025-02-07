<template>
  <section>
    <div v-if="product" class="product">
      <ul class="photos" v-if="product.fotos">
        <li v-for="(foto, index) in product.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.nome }}</h1>
        <p class="price">{{ formattedPrice }}</p>
        <p class="description">{{ product.descricao }}</p>
        <button class="btn" v-if="product.vendido === 'false'">Comprar</button>
        <button v-else class="btn" disabled>product Vendido</button>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<script lang="ts">
import type { Produto } from "@/interfaces/Produto";
import { formattedPrice } from "@/helpers/formattedPrice";
import { api } from "@/services";

export default {
  name: "ProductView",
  props: ["id"],
  data() {
    return {
      product: null as Produto | null
    };
  },
  computed: {
    formattedPrice() {
      return this.product ? formattedPrice(this.product.preco) : "";
    }
  },
  methods: {
    getProduct() {
      api.get(`/produto/${this.id}`).then(response => {
        this.product = response.data;
      });
    }
  },
  created() {
    this.getProduct();
  }
}
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.photos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.description {
  font-size: 1.2rem;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
  }
  .photos {
    grid-row: 2;
  }
  .info {
    position: initial;
  }
}
</style>
