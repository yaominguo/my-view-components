import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from '@/MyComponent'
import { router } from './router'
import 'vite-plugin-vuedoc/style.css'
import './main.stylus'

createApp(App).use(router).use(MyComponent).mount('#app')
