import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/Welcome.vue'),
    },
    {
      path: '/minimal/:entitySet',
      name: 'minimal',
      component: () => import('../views/Minimal.vue'),
      props: true
    },
    {
      path: '/advanced/:entitySet',
      name: 'advanced',
      component: () => import('../views/Advanced.vue'),
      props: true
    },
  ],
})

export default router
