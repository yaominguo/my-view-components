import { App } from 'vue'
import animate from 'animate.css'
import MyMap from '@/MyComponent/MyMap/my-map.vue'
import MyTitle from '@/MyComponent/MyTitle/my-title.vue'
import MyLoader from '@/MyComponent/MyLoader/my-loader.vue'
import MyAnimate from '@/MyComponent/MyAnimate/my-animate.vue'
import MyGrid from '@/MyComponent/MyGrid/my-grid.vue'
import MyCard from '@/MyComponent/MyCard/my-card.vue'
import MyCount from '@/MyComponent/MyCount/my-count.vue'
import MyModal from '@/MyComponent/MyModal/my-modal.vue'
import MyScroll from '@/MyComponent/MyScroll/my-scroll.vue'
import MyForm from '@/MyComponent/MyForm/my-form.vue'
import MyTable from '@/MyComponent/MyTable/my-table.vue'
import MyStep from '@/MyComponent/MyStep/my-step.vue'
import MyEmpty from '@/MyComponent/MyEmpty/my-empty.vue'
import MyLine from '@/MyComponent/MyChart/my-line.vue'
import MyBar from '@/MyComponent/MyChart/my-bar.vue'
import MyPie from '@/MyComponent/MyChart/my-pie.vue'
import MyRadar from '@/MyComponent/MyChart/my-radar.vue'
import MyScatter from '@/MyComponent/MyChart/my-scatter.vue'
import MySub from '@/MyComponent/MySub/my-sub.vue'
import MyWave from '@/MyComponent/MyWave/my-wave.vue'
import MyProgress from '@/MyComponent/MyProgress/my-progress.vue'
import MyDrawer from '@/MyComponent/MyDrawer/my-drawer.vue'
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
