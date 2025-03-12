<template>
  <section>
    <h2>Crie a Sua Conta</h2>

    <button v-if="!created" class="btn" @click="created = true">Criar Conta</button>
    <UserForm v-else>
      <ErrorNotification :errors="errors" />
      <button class="btn btn-form" @click.prevent="submitCreateUser">Criar Usuário</button>
    </UserForm>
  </section>
</template>

<script lang="ts">
import UserForm from "@/components/UserForm.vue"
import type { ErrorResponse } from "@/interfaces/Global"
import { useGlobalStore } from "@/store"

export default {
  name: "createLogin",
  components: {
    UserForm,
  },
  data() {
    return {
      created: false,
      errors: [] as string[],
    }
  },
  methods: {
    async submitCreateUser() {
      this.errors = []
      try {
        const context = useGlobalStore()
        await context.createUser(context.user)
        await context.loginUser(context.user.email, context.user.senha)
        await context.fetchUser()
        this.$router.push("/usuario")
      } catch (e) {
        const error = e as ErrorResponse
        this.errors.push(error?.response?.data?.message || "Erro ao created usuário")
      }
    },
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
