<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, watchEffect } from 'vue'
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  DatasetComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
import { RadarChart, RadarSeriesOption } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  RadarChart,
  SVGRenderer,
])
import useChartGenerate from '@/hooks/useChartGenerate'

type ECOption = echarts.ComposeOption<
  | DatasetComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | RadarSeriesOption
>

export default defineComponent({
  name: 'MyRadar',
  displayName: 'm-radar',
  props: {
    dataset: {
      type: Object as PropType<DatasetComponentOption>,
      default: null,
    },
    option: {
      type: Object as PropType<ECOption>,
      default: null,
    },
    format: {
      type: Function as PropType<
        (dataset: DatasetComponentOption, option: ECOption) => ECOption
      >,
      default: null,
    },
  },
  setup(props) {
    const defaultOption: ECOption = {
      backgroundColor: 'transparent',
      tooltip: {
        confine: true,
        trigger: 'item',
      },
      legend: {},
      grid: {
        left: '2%',
        right: '4%',
        bottom: '1%',
        containLabel: true,
      },
      radar: {
        axisName: {
          textStyle: {
            color: '#fff',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        indicator: {},
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'rgba(1,124,143,.9)',
              'rgba(1,124,143,.7)',
              'rgba(1,124,143,.5)',
              'rgba(1,124,143,.3)',
              'rgba(1,124,143,.1)',
            ],
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.3)',
          },
        },
        axisLine: {
          show: false,
        },
        center: ['50%', '55%'],
        radius: '55%',
      },
    }
    const defaultSeriesItem: RadarSeriesOption = {
      type: 'radar',
      symbol: 'none',
      areaStyle: {
        opacity: 0.5,
      },
      emphasis: {
        focus: 'item',
      },
    }
    const { chartRef, initChart } = useChartGenerate(
      props.option ? Object.assign(defaultOption, props.option) : defaultOption,
      defaultSeriesItem,
      props.format
    )
    onMounted(async () => {
      initChart(props.dataset, props.option)
    })
    watchEffect(() => {
      (defaultOption as any).radar.indicator =
        props.dataset &&
        props.dataset.dimensions &&
        props.dataset.dimensions.map((d) => ({
          name: (d as any).displayName,
          max: (d as any).max,
        }))
      initChart(props.dataset, props.option)
    })
    return {
      chartRef,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-chart
  $full()
</style>
