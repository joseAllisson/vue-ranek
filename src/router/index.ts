import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import ProductView from "@/views/ProductView.vue"
import LoginView from "@/views/LoginView.vue";
import UserView from "@/views/user/UserView.vue";
import UserProducts from "@/views/user/UserProducts.vue";
import UserSale from "@/views/user/UserSale.vue";
import UserEdit from "@/views/user/UserEdit.vue";
import UserBuy from "@/views/user/UserBuy.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/produto/:id",
      name: "product",
      component: ProductView,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/usuario",
      component: UserView,
      children: [
        {
          name: "usuario",
          path: "",
          component: UserProducts,
          meta: { title: "Meus Produtos" }
        },
        {
          name: "compras",
          path: "compras",
          component: UserBuy,
          meta: { title: "Minhas Compras" }
        },
        {
          name: "vendas",
          path: "vendas",
          component: UserSale,
          meta: { title: "Minhas Vendas" }
        },
        {
          name: "editar",
          path: "editar-usuario",
          component: UserEdit,
          meta: { title: "Editar Perfil" }
        }
      ]
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
}
})

export default router
