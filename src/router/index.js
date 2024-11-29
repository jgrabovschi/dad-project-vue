import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/auth/Login.vue'
import { useAuthStore } from '@/stores/auth'
import Game from '@/components/Game.vue'
import Transactions from '@/components/Transactions.vue'
import WebSocket from '@/components/WebSocketTester.vue'
import Profile from '@/components/Profile.vue'
import Home from '@/components/Home.vue'
import GameHistory from '@/components/GameHistory.vue'
import Signup from '@/components/auth/Signup.vue'
import EditProfile from '@/components/EditProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    },
    {
      path: '/ws',
      name: 'websocket',
      component: WebSocket,
    },
    {
      path: '/me',
      name: 'myprofile',
      component: Profile,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    },{
      path: '/history',
      name: 'history',
      component: GameHistory,
    },{
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: EditProfile,
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

    if (to.name == "myprofile" && (!storeAuth.user)) {
      next({ name: 'login' })
      return
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
