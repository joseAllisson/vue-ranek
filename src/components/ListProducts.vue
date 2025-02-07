<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="product">
        <div class="product" v-for="product in products" :key="product.id">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo" />
            <p class="price">{{ formattedPrice(product.preco) }}</p>
            <h2 class="title">{{ product.nome }}</h2>
            <p>{{ product.descricao }}</p>
          </router-link>
        </div>
        <PaginateProducts :perPage="perPage" :total="total" />
      </div>
      <div v-else-if="products && products.length === 0" key="notFound">
        <p class="not-found">Busca sem resultados. Tente buscar outro termo.</p>
      </div>
      <LoadingPage v-else key="loading"/>
    </transition>
  </section>
</template>
<script lang="ts">
import { api } from "@/services"
import { serialize } from "@/helpers/serialize.ts"
import type { Produto } from "@/interfaces/Produto";
import PaginateProducts from "@/components/PaginateProducts.vue"
import { formattedPrice } from "@/helpers/formattedPrice";

export default {
  name: "ListProducts",
  components: {
    PaginateProducts
  },
  data() {
    return {
      products: null as Produto[] | null,
      perPage: 3,
      total: 0,
    }
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);

      return `/produto?_limit=${this.perPage}${query}`;
    }
  },
  methods: {
    formattedPrice(value: string) {
      return formattedPrice(value);
    },
    async getProducts() {
      try {
        api.get(this.url).then((response) => {
          this.total = Number(response.headers["x-total-count"]);
          this.products = response.data
        })
      } catch (error) {
        console.error("Erro ao buscar Produtos:", error)
      }
    },
  },
  watch: {
    url() {
      this.getProducts()
    },
  },
  created() {
    this.getProducts()
  },
}
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e80;
  font-weight: bold;
}

.not-found {
  text-align: center;
}
</style>
