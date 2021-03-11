import { App } from 'vue'
import animate from 'animate.css'
import MyMap from './src/MyComponent/MyMap/my-map.vue'
import MyTitle from './src/MyComponent/MyTitle/my-title.vue'
import MyLoader from './src/MyComponent/MyLoader/my-loader.vue'
import MyAnimate from './src/MyComponent/MyAnimate/my-animate.vue'
import MyGrid from './src/MyComponent/MyGrid/my-grid.vue'
import MyCard from './src/MyComponent/MyCard/my-card.vue'
import MyCount from './src/MyComponent/MyCount/my-count.vue'
import MyModal from './src/MyComponent/MyModal/my-modal.vue'
import MyScroll from './src/MyComponent/MyScroll/my-scroll.vue'
import MyForm from './src/MyComponent/MyForm/my-form.vue'
import MyTable from './src/MyComponent/MyTable/my-table.vue'
import MyStep from './src/MyComponent/MyStep/my-step.vue'
import MyEmpty from './src/MyComponent/MyEmpty/my-empty.vue'
import MyLine from './src/MyComponent/MyChart/my-line.vue'
import MyBar from './src/MyComponent/MyChart/my-bar.vue'
import MyPie from './src/MyComponent/MyChart/my-pie.vue'
import MyRadar from './src/MyComponent/MyChart/my-radar.vue'
import MyScatter from './src/MyComponent/MyChart/my-scatter.vue'
import MySub from './src/MyComponent/MySub/my-sub.vue'
import MyWave from './src/MyComponent/MyWave/my-wave.vue'
import MyProgress from './src/MyComponent/MyProgress/my-progress.vue'
import MyDrawer from './src/MyComponent/MyDrawer/my-drawer.vue'
// import { withInstall } from './util'
import 'normalize.css'

const components = [
  MyMap,
  MyTitle,
  MyAnimate,
  MyGrid,
  MyCard,
  MyCount,
  MyLoader,
  MyModal,
  MyScroll,
  MyForm,
  MyTable,
  MyStep,
  MyEmpty,
  MyLine,
  MyBar,
  MyPie,
  MyRadar,
  MyScatter,
  MySub,
  MyWave,
  MyProgress,
  MyDrawer,
]

const install = (app: App): App => {
  app.use(animate)
  // components.forEach((component) => app.use(withInstall(component)))
  components.forEach((component) =>
    app.component(component.displayName, component)
  )
  return app
}

// 使用import {MyGrid} from '@/MyComponent'来按需引入个别组件
export {
  MyMap,
  MyTitle,
  MyAnimate,
  MyGrid,
  MyCard,
  MyCount,
  MyLoader,
  MyModal,
  MyScroll,
  MyForm,
  MyTable,
  MyStep,
  MyEmpty,
  MyLine,
  MyBar,
  MyPie,
  MyRadar,
  MyScatter,
  MySub,
  MyWave,
  MyProgress,
  MyDrawer,
}

// 默认导出 —— 使用import MyComponent from '@/MyComponent'来引入所有组件
export default { install }
