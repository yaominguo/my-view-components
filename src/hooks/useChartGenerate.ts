import { onMounted, onBeforeUnmount, nextTick, shallowRef, Ref } from 'vue'
import * as echarts from 'echarts/core'
import {
  DatasetComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption,
} from 'echarts/components'

import {
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts'

type ECOption = echarts.ComposeOption<
  | DatasetComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | ScatterSeriesOption
>

interface ReturnProp {
  chartRef: Ref<null | HTMLElement>
  initChart: (dataset: DatasetComponentOption, option: ECOption) => void
}

/**
 * 构建图表组件公共方法
 * @param defaultOption 默认配置
 * @param defaultSeriesItem 默认的series项
 * @param fn 自定义的合并配置的方法
 */
export default function useChartGenerate<T extends ECOption, U>(
  defaultOption: T,
  defaultSeriesItem?: U,
  fn?: (dataset: DatasetComponentOption, option: any) => ECOption
): ReturnProp {
  const chartRef = shallowRef<null | HTMLElement>(null)
  const myChart = shallowRef<null | echarts.ECharts>(null)

  /**
   * 由于radar图的dataset支持不好，故这里根据数据集中source数组里的seriesName来重置tooltip显示的名字
   * @param originOptions 图标配置
   * @param dataset 数据集
   */
  const formatRadarSeries = (originOptions: ECOption, dataset: any) => {
    const source = dataset && dataset.source
    const length = (source && source.length) || 0
    const options = JSON.parse(JSON.stringify(originOptions))

    options.series = [
      {
        type: 'radar',
        data: [],
      },
    ]
    for (let index = 0; index < length; index++) {
      const data: number[] = []
      Object.keys(source[index]).forEach((key) => {
        if (key !== 'seriesName') {
          data.push(source[index][key])
        }
      })
      options.series[0].data.push(
        Object.assign({}, defaultSeriesItem, {
          value: data,
          name: source[index].seriesName,
        })
      )
    }
    return options
  }

  /**
   * 根据默认配置设置series，有自定义配置则覆盖默认配置
   * @param dataset 数据集
   * @param option 自定义图表配置
   */
  const mergeOptions = (
    dataset: DatasetComponentOption,
    option?: ECOption
  ): ECOption => {
    let length = 0
    if (dataset) {
      defaultOption.dataset = dataset
      if (dataset.dimensions) {
        length = dataset.dimensions.length - 1
      } else if (dataset.source) {
        length =
          Object.keys(
            (Array.isArray(dataset.source) && dataset.source[0]) || []
          ).length - 1
      }
    }
    if (!defaultOption.series || (defaultOption.series as any[]).length === 0) {
      defaultOption.series = []
      for (let index = 0; index < length; index++) {
        defaultSeriesItem && defaultOption.series.push(defaultSeriesItem)
      }
    }
    if ((defaultSeriesItem as any).type === 'radar') {
      return Object.assign(
        {},
        formatRadarSeries(defaultOption, dataset),
        option || {}
      )
    }
    return Object.assign({}, defaultOption, option || {})
  }

  /**
   * 将图表配置中的color选项如果有数组项则转换为渐变
   * @param options 图表配置
   */
  const formatColorOption = (options: ECOption): ECOption => {
    if (!options.color || (options.color as string[]).length === 0) {
      return options
    }
    options.color = (options.color as string[]).map((color) => {
      if (Array.isArray(color)) {
        if (color.length < 2) {
          console.error('Echarts color选项里的数组参数至少需要2个字符串元素！')
          return 'black'
        }
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
    return options
  }

  /**
   * 根据数据集和配置初始化图表
   * @param dataset 数据集
   * @param option 自定义图表配置
   */
  const initChart = (dataset: DatasetComponentOption, option?: ECOption) => {
    if (!myChart.value) return
    const options = fn ? fn(dataset, option) : mergeOptions(dataset, option)
    if (
      !options.series ||
      (Array.isArray(options.series) && options.series.length === 0)
    ) {
      return
    }
    const resultOptions = formatColorOption(options)
    myChart.value.setOption(resultOptions, true)
  }

  /**
   * 根据屏幕大小自动调整图表尺寸
   */
  const handleResize = () => {
    if (!myChart.value) return
    myChart.value.resize()
  }

  onMounted(async () => {
    window.addEventListener('resize', handleResize)
    await nextTick()
    myChart.value = echarts.init(chartRef.value as HTMLElement, 'dark')
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    if (!myChart.value) return
    myChart.value.dispose()
    myChart.value = null
  })

  return { chartRef, initChart }
}
