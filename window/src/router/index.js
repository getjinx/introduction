import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Window from '../views/window.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/window",
    name: "Window",
    component: Window
  }
]

const router = new VueRouter({
  routes
})

export default router
