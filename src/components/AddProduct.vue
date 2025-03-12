<template>
  <form class="add-product" @submit.prevent="addProduct">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="product.nome" required />

    <label for="preco">Preço (R$)</label>
    <input id="preco" name="preco" type="number" v-model="product.preco" required />

    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" multiple ref="photos" />

    <label for="descricao">Descrição</label>
    <textarea id="descricao" name="descricao" v-model="product.descricao"></textarea>

    <button class="btn" type="submit" :disabled="added">
      {{ added ? "Adicionando..." : "Adicionar Produto" }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { api } from "@/services"
import { useGlobalStore } from "@/store"

export default defineComponent({
  setup() {
    const context = useGlobalStore()

    // Produto inicial
    const product = ref({
      nome: "",
      preco: "",
      descricao: "",
      vendido: "false",
    })

    // Referência para input de arquivo
    const photos = ref<HTMLInputElement | null>(null)

    // Estado de carregamento
    const added = ref(false)

    // Formatar product para enviar
    const formatProduct = () => {
      const form = new FormData()

      if (photos.value?.files) {
        Array.from(photos.value.files).forEach((file) => {
          form.append("fotos", file)
        })
      }

      form.append("nome", product.value.nome)
      form.append("preco", product.value.preco)
      form.append("descricao", product.value.descricao)
      form.append("vendido", product.value.vendido)
      form.append("usuario_id", context.user.id)

      return form
    }

    // Adicionar product
    const addProduct = async () => {
      try {
        added.value = true
        const productFormated = formatProduct()

        await api.post("/produto", productFormated)
        await context.fetchUserProducts()

        // Limpa o formulário após adicionar
        product.value = { nome: "", preco: "", descricao: "", vendido: "false" }
        if (photos.value) photos.value.value = ""
      } finally {
        added.value = false
      }
    }

    return {
      product,
      photos,
      added,
      addProduct,
    }
  },
})
</script>

<style scoped>
.add-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
