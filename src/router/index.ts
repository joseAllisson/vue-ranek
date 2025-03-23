import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import ProductView from "@/views/ProductView.vue"
import LoginView from "@/views/LoginView.vue"
import UserView from "@/views/user/UserView.vue"
import UserProducts from "@/views/user/UserProducts.vue"
import UserSale from "@/views/user/UserSale.vue"
import UserEdit from "@/views/user/UserEdit.vue"
import UserBuy from "@/views/user/UserBuy.vue"
import PageNotFound from "@/views/PageNotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: PageNotFound,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/produto/:id",
      name: "product",
      component: ProductView,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/usuario",
      meta: {
        login: true,
      },
      component: UserView,
      children: [
        {
          name: "usuario",
          path: "",
          component: UserProducts,
          meta: { title: "Meus Produtos" },
        },
        {
          name: "compras",
          path: "compras",
          component: UserBuy,
          meta: { title: "Minhas Compras" },
        },
        {
          name: "vendas",
          path: "vendas",
          component: UserSale,
          meta: { title: "Minhas Vendas" },
        },
        {
          name: "editar",
          path: "editar-usuario",
          component: UserEdit,
          meta: { title: "Editar Perfil" },
        },
      ],
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" })
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = (to.meta?.title as string) || "Ranek"
  }

  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
