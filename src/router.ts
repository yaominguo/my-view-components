import { createRouter, createWebHistory } from 'vue-router'
import Layout from './layout.vue'
import menus from './menu'
import Home from './home.md'

export const router = createRouter({
  history: createWebHistory('/my-view-components/'),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Layout,
      redirect: '/home',
      children: [
        {
          name: 'home',
          path: '/home',
          component: Home,
        },
        ...menus.map((menu) => ({
          name: menu.name,
          path: `/${menu.name}`,
          component: menu.component,
        })),
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
