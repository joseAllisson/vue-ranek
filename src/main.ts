import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import LoadingPage from "@/components/LoadingPage.vue"

const app = createApp(App)

app.component("LoadingPage", LoadingPage);

app.config.globalProperties.$filters = {
  currency(value: number) {
    console.log(value)
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
};

app.use(router)

app.mount("#app")
