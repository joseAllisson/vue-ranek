<template>
  <section>
    <h2>Vendas</h2>
    <div v-if="isLoading">
      <LoadingPage />
    </div>
    <div v-else-if="sales.length">
      <div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
        <ItemProduct v-if="sale.produto" :product="sale.produto">
          <p class="vender">
            <span>Comprador:</span>
            {{ sale.comprador_id }}
          </p>
        </ItemProduct>
        <div class="enter">
          <h3>Entrega:</h3>
          <ul v-if="sale.endereco">
            <li v-for="(value, key) in sale.endereco" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </div>
      </div>
    </div>
    <p v-else>Nenhuma venda encontrada.</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue"
import { api } from "@/services"
import { useGlobalStore } from "@/store"
import ItemProduct from "@/components/ItemProduct.vue"
import type { Sale } from "@/interfaces/Sale"

export default defineComponent({
  components: {
    ItemProduct,
  },
  setup() {
    const sales = ref<Sale[]>([])
    const isLoading = ref(false)
    const { isLoggedIn } = useGlobalStore()

    const getSales = async () => {
      isLoading.value = true
      try {
        const { data } = await api.get("/transacao?tipo=vendedor_id")
        sales.value = data
      } catch (error) {
        console.error("Erro ao buscar as vendas:", error)
      } finally {
        isLoading.value = false
      }
    }

    watchEffect(() => {
      if (isLoggedIn) {
        getSales()
      }
    })

    return {
      sales,
      isLoading,
    }
  },
})
</script>
