<template>
  <ul v-if="totalPages > 1">
    <router-link :to="{ query: query(1) }"> &lt;&lt; </router-link>
    <li v-for="page in getPages" :key="page">
      <router-link :class="{ active: isActive(page) }" :to="{ query: query(page) }">
        {{ page }}
      </router-link>
    </li>
    <router-link :to="{ query: query(totalPages) }"> &gt;&gt; </router-link>
  </ul>
</template>

<script lang="ts">
export default {
  name: "PaginateProducts",
  props: {
    perPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(page: number) {
      return {
        ...this.$route.query,
        _page: page,
      }
    },
    isActive(page: number) {
      // Se não houver _page na URL, assume que a página atual é 1
      const currentPage = Number(this.$route.query._page) || 1
      return currentPage === page
    },
  },
  computed: {
    getPages() {
      const current = Number(this.$route.query._page) || 1 // Garante que a página inicie em 1
      const range = 9
      const offset = Math.floor(range / 2)
      const total = this.totalPages

      let start = Math.max(1, current - offset)
      const end = Math.min(total, start + range - 1)

      // Garante que o range mostre corretamente as últimas páginas
      if (end - start < range - 1) {
        start = Math.max(1, end - range + 1)
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.perPage))
    },
  },
}
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 4px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
