<template>
  <form>
    <input name="search" id="search" type="text" placeholder="Buscar..." v-model="search" />
    <input type="submit" id="lupa" value="Buscar" @click.prevent="buscarProdutos" />
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search: "",
    }
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.search } })
    },
  },
}
</script>
<style scope>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#search {
  width: 100%;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 20px;
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
}

#search:focus,
#search:hover {
  outline: none;
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>
