import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import LoadingPage from "@/components/LoadingPage.vue"
import ErrorNotification from "@/components/ErrorNotification.vue"

const app = createApp(App)
const pinia = createPinia()

app.component("LoadingPage", LoadingPage)
app.component("ErrorNotification", ErrorNotification)

app.config.globalProperties.$filters = {
  currency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  },
}

app.use(pinia)
app.use(router)

app.mount("#app")
