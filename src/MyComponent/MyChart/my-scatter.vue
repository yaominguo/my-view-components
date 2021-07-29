<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watchEffect } from 'vue'
import { use } from 'echarts/core'
import { ScatterChart, EffectScatterChart } from 'echarts/charts'
use([ScatterChart, EffectScatterChart])
import useChartGenerate from './useChartGenerate'
import { ScatterOption, DatasetComponentOption } from './types'

export default defineComponent({
  name: 'MyScatter',
  displayName: 'm-scatter',
  props: {
    dataset: {
      type: Object as PropType<DatasetComponentOption>,
      default: null,
    },
    option: {
      type: Object as PropType<ScatterOption>,
      default: null,
    },
  },
  emits: ['init'],
  setup(props, ctx) {
    const defaultOption: ScatterOption = {
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
    const defaultSeriesItem = {
      type: 'scatter',
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
