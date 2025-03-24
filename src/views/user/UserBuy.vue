<template>
  <section>
    <h2>Compras</h2>
    <div v-if="isLoading">
      <LoadingPage />
    </div>
    <div v-else-if="orders.length">
      <div class="products-wrapper" v-for="(order, index) in orders" :key="index">
        <ItemProduct v-if="order.produto" :product="order.produto">
          <p class="vender">
            <span>Vendedor:</span>
            {{ order.vendedor_id }}
          </p>
        </ItemProduct>
      </div>
    </div>
    <p v-else>Nenhuma compra encontrada.</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue"
import { api } from "@/services"
import { useGlobalStore } from "@/store"
import ItemProduct from "@/components/ItemProduct.vue"
import type { Order } from "@/interfaces/Order"

export default defineComponent({
  components: {
    ItemProduct,
  },
  setup() {
    const orders = ref<Order[]>([])
    const isLoading = ref(false)
    const { isLoggedIn } = useGlobalStore()

    const getBuy = async () => {
      isLoading.value = true
      try {
        const { data } = await api.get("/transacao?tipo=comprador_id")
        orders.value = data
      } catch (error) {
        console.error("Erro ao buscar as compras:", error)
      } finally {
        isLoading.value = false
      }
    }

    watchEffect(() => {
      if (isLoggedIn) {
        getBuy()
      }
    })

    return {
      orders,
      isLoading,
    }
  },
})
</script>
