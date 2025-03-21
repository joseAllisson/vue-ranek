<template>
  <section>
    <h2>Vendas</h2>
    <div v-if="sales.length">
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
    <LoadingPage v-else />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue"
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
    const { isLoggedIn } = useGlobalStore()

    const getSales = async () => {
      try {
        const { data } = await api.get("/transacao?tipo=vendedor_id")
        sales.value = data
      } catch (error) {
        console.error("Erro ao buscar as compras:", error)
      }
    }

    // Recarrega as compras quando o usuário estiver logado
    watchEffect(() => {
      if (isLoggedIn) {
        getSales()
      }
    })

    onMounted(() => {
      document.title = "Usuário | Vendas"
    })

    return {
      sales,
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

.enter {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0px;
  justify-self: end;
}

@media screen and (max-width: 500px) {
  .enter {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  h3 {
    justify-self: start;
  }
}
</style>
