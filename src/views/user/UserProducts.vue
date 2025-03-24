<template>
  <section>
    <h2>Adicionar produto</h2>
    <AddProduct />
    <h2>Seus produtos</h2>
    <!-- {{ userProducts }} -->
    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="(product, index) in userProducts" :key="index">
        <ItemProduct :product="product">
          <p>{{ product.descricao }}</p>
          <button class="delete" @click="deleteProduct(product.id)">Deletar</button>
        </ItemProduct>
      </li>
    </transition-group>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, watch } from "vue"
import AddProduct from "@/components/AddProduct.vue"
import { useGlobalStore } from "@/store"
import ItemProduct from "@/components/ItemProduct.vue"
import { api } from "@/services"

export default defineComponent({
  components: {
    AddProduct,
    ItemProduct,
  },
  setup() {
    const context = useGlobalStore()

    onMounted(() => {
      console.log(context.isLoggedIn)
      // if (context.isLoggedIn) {
      context.fetchUserProducts()
      // }
    })

    watch(
      () => context.isLoggedIn,
      (isLoggedIn) => {
        if (isLoggedIn) {
          context.fetchUserProducts()
        }
      },
    )

    // Computed para acessar os produtos do usuário
    const userProducts = computed(() => context.userProducts)

    const deleteProduct = async (id: number) => {
      const confirm = window.confirm("Deseja remover este produto?")
      if (confirm) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            context.fetchUserProducts()
          })
          .catch((error) => {
            console.error(error)
            window.alert("Erro ao deletar produto")
          })
      }
    }

    return {
      userProducts,
      deleteProduct,
    }
  },
})
</script>
<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.delete {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
