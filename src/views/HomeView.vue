<script setup lang="ts">
import SearchProducts from "@/components/SearchProducts.vue"
import ListProducts from "@/components/ListProducts.vue"
</script>

<template>
  <section>
    <h1>👍 Compre ou Venda 👎</h1>
    <SearchProducts />
    <ListProducts />
  </section>
</template>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
