<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'
import { use } from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
use([ScatterChart])
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
  setup(props) {
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
    watch(
      [() => props.dataset, () => props.option],
      () => initChart(props.dataset, props.option),
      { immediate: true }
    )
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
