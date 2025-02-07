<template>
  <ul v-if="totalPages > 1">
    <router-link :to="{ query: query(1) }">
      &lt;&lt;
    </router-link>
    <li v-for="page in getPages" :key="page">
      <router-link :class="{ active: isActive(page) }" :to="{ query: query(page) }">
        {{ page }}
      </router-link>
    </li>
    <router-link :to="{ query: query(totalPages) }">
      &gt;&gt;
    </router-link>
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
        _page: page
      };
    },
    isActive(page: number) {
      return Number(this.$route.query._page) === page;
    }
  },
  computed: {
    getPages() {
      const current = Number(this.$route.query._page);
      const range = 9;
      const offset = Math.ceil(range / 2);
      const total = this.totalPages;
      const pagesArray = [];

      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return pagesArray;
    },
    totalPages() {
      const totalPage = this.total / this.perPage;
      return (totalPage !== Infinity) ? Math.ceil(totalPage) : 0;
    },
  },
};
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
