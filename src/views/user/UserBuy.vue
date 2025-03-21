<template>
  <section>
    <h2>Compras</h2>
    <div v-if="orders?.length">
      <div class="products-wrapper" v-for="(order, index) in orders" :key="index">
        <ItemProduct v-if="order.produto" :product="order.produto">
          <p class="vender">
            <span>Vendedor:</span>
            {{ order.vendedor_id }}
          </p>
        </ItemProduct>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue"
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
    const { isLoggedIn } = useGlobalStore()

    const getBuy = async () => {
      try {
        const { data } = await api.get("/transacao?tipo=comprador_id")
        orders.value = data
      } catch (error) {
        console.error("Erro ao buscar as compras:", error)
      }
    }

    // Recarrega as compras quando o usuário estiver logado
    watchEffect(() => {
      if (isLoggedIn) {
        getBuy()
      }
    })

    onMounted(() => {
      document.title = "Usuário | Compras"
    })

    return {
      orders,
    }
  },
})
</script>

<style scoped>
.products-wrapper {
  margin-bottom: 40px;
}

.vender span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
