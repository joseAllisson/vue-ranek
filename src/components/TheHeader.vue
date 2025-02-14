<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link v-if="user" to="/usuario" class="btn">{{ user }}</router-link>
      <router-link v-else class="btn" to="/login">Vender / Login</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { useGlobalStore } from "@/store";

export default {
  name: "TheHeader",
  computed: {
    user() {
      return useGlobalStore().user.nome.replace(/ .*/, "");
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  max-width: 100px;
}
</style>
