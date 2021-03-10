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
import { ScatterChart, ScatterSeriesOption } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ScatterChart,
  SVGRenderer,
])
import useChartGenerate from '@/hooks/useChartGenerate'

type ECOption = echarts.ComposeOption<
  | DatasetComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | ScatterSeriesOption
>

export default defineComponent({
  name: 'MyScatter',
  displayName: 'm-scatter',
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
      xAxis: {},
      yAxis: {},
    }
    const defaultSeriesItem: ScatterSeriesOption = {
      type: 'scatter',
    }
    const { chartRef, initChart } = useChartGenerate(
      defaultOption,
      defaultSeriesItem,
      props.format
    )
    onMounted(async () => {
      initChart(props.dataset, props.option)
    })
    watchEffect(() => {
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
