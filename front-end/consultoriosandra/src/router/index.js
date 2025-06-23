import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tourism from '../views/Tourism.vue'
import Manage from '../views/Management.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/carmen',
    name: 'tourism',
    component: Tourism,
    meta: {rutaProtegida: true}
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    meta: {rutaProtegida: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const pathProtect = to.matched.some(item => item.meta.rutaProtegida)
  if(pathProtect && store.state.token === null){
    next('/')
  }
  else{
    next()
  }

})

export default router
