import { onMounted, onBeforeUnmount, nextTick, shallowRef, Ref } from 'vue'
import { use, init, graphic, ECharts } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components'

use([
  SVGRenderer,
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
])

import { RadarSeriesOption } from 'echarts/charts'
import { ECOption, RadarOption, DatasetComponentOption } from './types'

interface ReturnProp {
  chartRef: Ref<null | HTMLElement>
  initChart: (dataset: DatasetComponentOption, option?: ECOption) => void
}

/**
 * 根据屏幕调整尺寸
 * @param myChart Echarts实例引用
 * @param chartRef Echarts容器引用
 */
const setResizeAble = (myChart: Ref, chartRef: Ref) => {
  const handleResize = () => {
    if (!myChart.value) return
    myChart.value.resize()
  }

  onMounted(async () => {
    window.addEventListener('resize', handleResize)
    await nextTick()
    myChart.value = init(chartRef.value as HTMLElement, 'dark')
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    if (!myChart.value) return
    myChart.value.dispose()
    myChart.value = null
  })
}

/**
 * 由于radar图的dataset支持不好
 * 故此根据数据集里source数组里的seriesName来重置tooltip显示的名字
 * @param defaultOption 图表默认配置
 * @param defaultSeriesItem 默认series项
 * @param dataset 数据集
 * @returns 转换后的图表配置
 */
const transRadarOption = (
  defaultOption: RadarOption,
  defaultSeriesItem: RadarSeriesOption,
  dataset: DatasetComponentOption
): RadarOption => {
  const source = dataset && (dataset.source as any[])
  const length = (source && source.length) || 0
  const result = Object.assign({}, defaultOption)

  const seriesData = []
  for (let index = 0; index < length; index++) {
    const data: number[] = []
    Object.keys(source[index]).forEach((key) => {
      if (key !== 'seriesName') {
        data.push(source[index][key])
      }
    })
    seriesData.push(
      Object.assign({}, defaultSeriesItem, {
        value: data,
        name: source[index].seriesName,
      })
    )
  }

  result.series = [
    {
      type: 'radar',
      data: seriesData as any[],
    },
  ]
  if (dataset) result.dataset = dataset
  return result
}

/**
 * 设置color选项中
 * 如果有数组项则封装为渐变
 * @param options 图表配置
 */
const transLinearColorOption = (options: ECOption): ECOption => {
  if (!options.color || (options.color as string[]).length === 0) {
    return options
  }
  const result = Object.assign({}, options)
  result.color = (result.color as string[]).map((color) => {
    if (Array.isArray(color)) {
      if (color.length < 2) {
        return color[0]
      }
      return new graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: color[0],
        },
        {
          offset: 1,
          color: color[1],
        },
      ])
    }
    return color
  })
  return result
}

/**
 * 将defaultSeriesItem和dataset填充进defaultOption形成初始配置项
 * @param defaultOption 默认图表配置
 * @param defaultSeriesItem 默认series项
 * @param dataset 数据集
 * @returns 初始配置项
 */
const defaultConfig = <T>(
  defaultOption: ECOption,
  defaultSeriesItem: T,
  dataset: DatasetComponentOption
): ECOption => {
  const result = Object.assign({}, defaultOption)
  let length = 0

  result.series = []
  if (dataset) {
    result.dataset = dataset
    if (dataset.dimensions) {
      length = dataset.dimensions.length - 1
    } else if (dataset.source && Array.isArray(dataset.source)) {
      length = Object.keys(dataset.source[0] || []).length - 1
    }
  }

  for (let index = 0; index < length; index++) {
    result.series.push(defaultSeriesItem)
  }
  return result
}

/**
 * 合并默认配置项和自定义配置项
 * @param defaultOption 默认图表配置
 * @param customOption 自定义图表配置
 */
const mergeOptions = <T>(defaultOption: T, customOption: T) => {
  if (!customOption) return
  for (const key in customOption) {
    if (Array.isArray(customOption[key])) {
      defaultOption[key] = customOption[key]
      continue
    }
    if (customOption[key] !== null && typeof customOption[key] === 'object') {
      if (!defaultOption[key]) {
        defaultOption[key] = customOption[key]
      } else {
        mergeOptions(defaultOption[key], customOption[key])
      }
    } else {
      defaultOption[key] = customOption[key]
    }
  }
}

/**
 * 构建图表组件公共方法
 * @param defaultOption 默认配置
 * @param defaultSeriesItem 默认的series项
 * @returns chartRef:Echarts容器引用, initChart:初始化方法
 */
const useChartGenerate = <T>(
  defaultOption: ECOption,
  defaultSeriesItem: T
): ReturnProp => {
  const chartRef = shallowRef<null | HTMLElement>(null)
  const myChart = shallowRef<null | ECharts>(null)
  setResizeAble(myChart, chartRef)

  /**
   * 根据数据集和配置初始化图表
   * @param dataset 数据集
   * @param option 自定义图表配置
   */
  const initChart = (
    dataset: DatasetComponentOption,
    option?: ECOption
  ): any => {
    if (!myChart.value) return
    const config =
      (defaultSeriesItem as any).type === 'radar'
        ? transRadarOption(
            defaultOption as RadarOption,
            defaultSeriesItem as RadarSeriesOption,
            dataset
          )
        : defaultConfig(defaultOption, defaultSeriesItem, dataset)
    mergeOptions(config, option)
    myChart.value.setOption(transLinearColorOption(config), true)
    return myChart.value
  }

  return { chartRef, initChart }
}

export default useChartGenerate
