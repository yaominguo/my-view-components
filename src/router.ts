import { createRouter, createWebHistory } from 'vue-router'
import Layout from './layout.vue'
import menus from './menu'

export const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/my-view-components',
      name: 'Main',
      component: Layout,
      redirect: '/my-view-components/my-grid',
      children: menus.map((menu) => ({
        name: menu.name,
        path: `/my-view-components/${menu.name}`,
        component: menu.component,
      })),
    },
  ],
})
