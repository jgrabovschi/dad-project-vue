import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/auth/Login.vue'
import { useAuthStore } from '@/stores/auth'
import Game from '@/components/Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    }
  ],
})

let handlingFirstRoute = true

router.beforeEach(async (to, from, next) => {
    const storeAuth = useAuthStore()
    if (handlingFirstRoute) {
        handlingFirstRoute = false
        await storeAuth.restoreToken()
    }
    // // routes "updateTask" and "updateProject" are only accessible when user is logged in
    // if (((to.name == 'updateTask') || (to.name == 'updateProject')) && (!storeAuth.user)) {
    //     next({ name: 'login' })
    //     return
    // }
    // all other routes are accessible to everyone, including anonymous users
    next()
})

export default router
