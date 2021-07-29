import { App } from 'vue'
import MyMap from './MyMap/my-map.vue'
import MyTitle from './MyTitle/my-title.vue'
import MyLoader from './MyLoader/my-loader.vue'
import MyAnimate from './MyAnimate/my-animate.vue'
import MyGrid from './MyGrid/my-grid.vue'
import MyCard from './MyCard/my-card.vue'
import MyCount from './MyCount/my-count.vue'
import MyModal from './MyModal/my-modal.vue'
import MyScroll from './MyScroll/my-scroll.vue'
import MyForm from './MyForm/my-form.vue'
import MyTable from './MyTable/my-table.vue'
import MyStep from './MyStep/my-step.vue'
import MyEmpty from './MyEmpty/my-empty.vue'
import MyLine from './MyChart/my-line.vue'
import MyBar from './MyChart/my-bar.vue'
import MyPie from './MyChart/my-pie.vue'
import MyRadar from './MyChart/my-radar.vue'
import MyScatter from './MyChart/my-scatter.vue'
import MySub from './MySub/my-sub.vue'
import MyWave from './MyWave/my-wave.vue'
import MyProgress from './MyProgress/my-progress.vue'
import MyDrawer from './MyDrawer/my-drawer.vue'
import * as ChartTypes from './MyChart/types'
// import { withInstall } from './util'
import 'animate.css'
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
  // components.forEach((component) => app.use(withInstall(component)))
  components.forEach((component) =>
    app.component(component.displayName, component)
  )
  return app
}

// 使用import {MyGrid} from './components/MyComponent'来按需引入个别组件
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

// 图表组件的类型参数
export { ChartTypes }

// 默认导出 —— 使用import MyComponent from './components/MyComponent'来引入所有组件
export default { install }
