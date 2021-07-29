<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watchEffect } from 'vue'
import { use } from 'echarts/core'
import { LineChart, BarChart, PictorialBarChart } from 'echarts/charts'
use([LineChart, BarChart, PictorialBarChart])
import useChartGenerate from './useChartGenerate'
import { BarOption, DatasetComponentOption } from './types'

export default defineComponent({
  name: 'MyBar',
  displayName: 'm-bar',
  props: {
    dataset: {
      type: Object as PropType<DatasetComponentOption>,
      default: null,
    },
    option: {
      type: Object as PropType<BarOption>,
      default: null,
    },
  },
  emits: ['init'],
  setup(props, ctx) {
    const defaultOption: BarOption = {
      backgroundColor: 'transparent',
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '2%',
        right: '4%',
        bottom: '1%',
        top: '20%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
    }
    const defaultSeriesItem = {
      type: 'bar',
      barGap: 0,
      emphasis: {
        focus: 'series',
      },
    }
    const { chartRef, initChart } = useChartGenerate(
      defaultOption,
      defaultSeriesItem
    )
    onMounted(() => {
      const instance = initChart(props.dataset, props.option)
      instance && ctx.emit('init', instance)
    })
    watchEffect(() => {
      const instance = initChart(props.dataset, props.option)
      instance && ctx.emit('init', instance)
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
