<template>
  <section>
    <UserForm>
      <ErrorNotification :errors="errors" />
      <button class="btn" @click.prevent="updateUser">Atualizar usuário</button>
    </UserForm>
  </section>
</template>
<script lang="ts">
import UserForm from "@/components/UserForm.vue"
import type { ErrorResponse } from "@/interfaces/Global"
import { api } from "@/services"
import { useGlobalStore } from "@/store"

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      errors: [] as string[],
    }
  },
  methods: {
    updateUser() {
      this.errors = []
      const context = useGlobalStore()
      api
        .put("/usuario", context.user)
        .then(() => {
          context.fetchUser()
          // redirect user
          this.$router.push({ name: "usuario" })
        })
        .catch((e) => {
          const error = e as ErrorResponse
          this.errors.push(error?.response?.data?.message || "Erro desconhecido")
        })
    },
  },
}
</script>
<style></style>
