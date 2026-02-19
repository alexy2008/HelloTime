import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/create',
    name: 'CreateCapsule',
    component: () => import('@/views/CreateCapsule.vue')
  },
  {
    path: '/capsule/:code',
    name: 'ViewCapsule',
    component: () => import('@/views/ViewCapsule.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router