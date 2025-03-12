<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErrorNotification :errors="errors" />
    <UserForm>
      <button class="btn" @click.prevent="completePurchase">Finalizar Compra</button>
    </UserForm>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useGlobalStore } from "@/store"
import UserForm from "@/components/UserForm.vue"
import { api } from "@/services"
import { useRouter } from "vue-router"
import type { ErrorResponse } from "@/interfaces/Global"

export default defineComponent({
  components: {
    UserForm,
  },
  props: ["product"],
  setup(props) {
    const router = useRouter()
    const globalStore = useGlobalStore()
    const errors = ref<string[]>([])

    const purchase = {
      buyer_id: globalStore.user.email,
      seller_id: props.product.usuario_id,
      product: props.product,
      address: {
        cep: globalStore.user.cep,
        rua: globalStore.user.rua,
        numero: globalStore.user.numero,
        bairro: globalStore.user.bairro,
        cidade: globalStore.user.cidade,
        estado: globalStore.user.estado,
      },
    }

    const createTransaction = async () => {
      await api.post("/transacao", purchase)
      router.push({ name: "compras" })
    }

    const createUser = async () => {
      try {
        await globalStore.createUser(globalStore.user)
        await globalStore.loginUser(globalStore.user.email, globalStore.user.senha)
        await globalStore.fetchUser()
        await createTransaction()
      } catch (e) {
        const error = e as ErrorResponse
        errors.value.push(error?.response?.data?.message || "Erro desconhecido")
      }
    }

    const completePurchase = () => {
      errors.value = []
      if (globalStore.isLoggedIn) {
        createTransaction()
      } else {
        createUser()
      }
    }

    return {
      errors,
      completePurchase,
    }
  },
})
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
