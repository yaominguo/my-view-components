import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from './layout.vue'
import menus from './menu'

export const router = createRouter({
  history: createWebHashHistory('/my-view-components/'),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Layout,
      redirect: '/my-grid',
      children: menus.map((menu) => ({
        name: menu.name,
        path: `/${menu.name}`,
        component: menu.component,
      })),
    },
  ],
})
