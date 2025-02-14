<template>
  <form>
    <div class="user-container" v-if="showLogin">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="user.nome">

      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="user.email">

      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" v-model="user.senha">
    </div>

    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="user.cep" @keyup="getAddressByCep">

    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="user.rua">

    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="user.numero">

    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="user.bairro">

    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="user.cidade">

    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="user.estado">

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script lang="ts">
import { getCep } from "@/services";
import { useGlobalStore } from "@/store";
import { computed } from "vue";

export default {
  setup() {
    const store = useGlobalStore();

    // Computed para acessar os dados do usuário diretamente da store
    const user = computed(() => store.user);

    // Função para preencher CEP
    const getAddressByCep = () => {
      const cep = user.value.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then(response => {
          store.updateUser({
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            estado: response.data.uf,
            cidade: response.data.localidade,
          });
        });
      }
    };

    return {
      user,
      getAddressByCep,
      showLogin: computed(() => !store.isLoggedIn),
    };
  }
};
</script>

<style scoped>
form,
.user-container {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user-container {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
