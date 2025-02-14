<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
    <UserForm v-else>
      <button class="btn btn-form" @click.prevent="submitCreateUser">Criar Usuário</button>
    </UserForm>
  </section>
</template>

<script lang="ts">
import UserForm from "@/components/UserForm.vue";
import { useGlobalStore } from "@/store";

export default {
  name: "createLogin",
  components: {
    UserForm
  },
  data() {
    return {
      criar: false
    }
  },
  methods: {
    async submitCreateUser() {
      try {
        const context = useGlobalStore();
        await context.createUser(context.user);
        await context.fetchUser(context.user.email, context.user.senha);
        this.$router.push("/usuario");
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
