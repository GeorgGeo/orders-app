// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router'

import OrdersView from '@/views/OrdersView.vue'
import ProductsView from '@/views/ProductsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/orders',
  },

  {
    path: '/orders',
    name: 'orders',
    component: OrdersView,
  },

  {
    path: '/products',
    name: 'products',
    component: ProductsView,
  },

  {
    path: '/groups',
    name: 'groups',
    component: OrdersView,
  }, // временная заглушка

  {
    path: '/users',
    name: 'users',
    component: OrdersView,
  }, // временная заглушка

  {
    path: '/settings',
    name: 'settings',
    component: OrdersView,
  } // временная заглушка
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
