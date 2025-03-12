<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />

      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password" />

      <ErrorNotification :errors="errors" />

      <button class="btn" @click.prevent="submit">Logar</button>
    </form>
    <p class="forgot">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <CreateLogin />
  </section>
</template>

<script lang="ts">
import CreateLogin from "@/components/CreateLogin.vue"
import type { ErrorResponse } from "@/interfaces/Global"
import { useGlobalStore } from "@/store"

export default {
  components: {
    CreateLogin,
  },
  name: "LoginView",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      errors: [] as string[],
    }
  },
  methods: {
    async submit() {
      this.errors = []
      try {
        const context = useGlobalStore()
        await context.loginUser(this.login.email, this.login.password)
        await context.fetchUser()
        this.$router.push("/usuario")
      } catch (e) {
        const error = e as ErrorResponse
        this.errors.push(error?.response?.data?.message || "Erro ao logar")
      }
    },
  },
}
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.forgot {
  text-align: center;
  margin: 20px auto 0 auto;
}

.forgot a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
