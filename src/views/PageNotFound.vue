<template>
  <div class="not-found">
    <div class="background-shape"></div>
    <h1>Página não encontrada</h1>
    <p>Ops! Parece que a página que você está procurando não existe.</p>
    <router-link to="/" class="btn">Voltar para Home</router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.not-found {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  background-color: #f8f9fa;
  padding: 20px;
  overflow: hidden;
}

.background-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: #65d;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}

.not-found h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  z-index: 1;
}

.not-found p {
  color: #666;
  margin-bottom: 20px;
  z-index: 1;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #65d;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s;
  z-index: 1;
}

.btn:hover {
  background-color: #5490ff;
}
</style>
