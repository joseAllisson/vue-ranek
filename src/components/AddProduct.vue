<template>
  <form class="adicionar-produto" @submit.prevent="adicionarProduto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome" required />

    <label for="preco">Preço (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco" required />

    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" multiple ref="fotos" />

    <label for="descricao">Descrição</label>
    <textarea id="descricao" name="descricao" v-model="produto.descricao"></textarea>

    <button class="btn" type="submit" :disabled="adicionando">
      {{ adicionando ? "Adicionando..." : "Adicionar Produto" }}
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
    const produto = ref({
      nome: "",
      preco: "",
      descricao: "",
      vendido: "false",
    })

    // Referência para input de arquivo
    const fotos = ref<HTMLInputElement | null>(null)

    // Estado de carregamento
    const adicionando = ref(false)

    // Formatar produto para enviar
    const formatarProduto = () => {
      const form = new FormData()

      if (fotos.value?.files) {
        Array.from(fotos.value.files).forEach((file) => {
          form.append("fotos", file)
        })
      }

      form.append("nome", produto.value.nome)
      form.append("preco", produto.value.preco)
      form.append("descricao", produto.value.descricao)
      form.append("vendido", produto.value.vendido)
      form.append("usuario_id", context.user.id)

      return form
    }

    // Adicionar produto
    const adicionarProduto = async () => {
      try {
        adicionando.value = true
        const produtoFormatado = formatarProduto()

        await api.post("/produto", produtoFormatado)
        await context.fetchUserProducts()

        // Limpa o formulário após adicionar
        produto.value = { nome: "", preco: "", descricao: "", vendido: "false" }
        if (fotos.value) fotos.value.value = ""
      } finally {
        adicionando.value = false
      }
    }

    return {
      produto,
      fotos,
      adicionando,
      adicionarProduto,
    }
  },
})
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
