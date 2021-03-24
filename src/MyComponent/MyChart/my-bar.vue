<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
use([LineChart, BarChart])
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
  setup(props) {
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
