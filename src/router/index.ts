import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/AddTodoView.vue')
    },
    {
      path: '/todos/:id',
      name: 'edit',
      props: true,
      component: () => import('@/views/EditTodoView.vue')
    },
  ]
})

export default router
