<template>
  <TheHeader />
  <main id="main">
    <transition mode="out-in">
      <router-view />
    </transition>
  </main>
  <TheFooter />
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import TheFooter from "@/components/TheFooter.vue"
import { api } from "./services"
import { useGlobalStore } from "./store"

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  created() {
    const context = useGlobalStore()
    if (window.localStorage.getItem("token")) {
      api
        .validateToken()
        .then(() => {
          context.fetchUser()
        })
        .catch(() => {
          context.logoutUser()
        })
    }
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

body {
  font-family: "Avenir", Helvetica, Arial, Helvetica, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #65d;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
