<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watchEffect } from 'vue'
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
use([LineChart, BarChart])
import useChartGenerate from './useChartGenerate'
import { LineOption, DatasetComponentOption } from './types'

export default defineComponent({
  name: 'MyLine',
  displayName: 'm-line',
  props: {
    dataset: {
      type: Object as PropType<DatasetComponentOption>,
      default: null,
    },
    option: {
      type: Object as PropType<LineOption>,
      default: null,
    },
  },
  setup(props) {
    const defaultOption: LineOption = {
      backgroundColor: 'transparent',
      tooltip: {
        confine: true,
        trigger: 'axis',
      },
      legend: {},
      grid: {
        left: '2%',
        right: '5%',
        bottom: '1%',
        top: '20%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
    }
    const defaultSeriesItem = {
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 2,
      },
      emphasis: {
        focus: 'series',
      },
    }
    const { chartRef, initChart } = useChartGenerate(
      defaultOption,
      defaultSeriesItem
    )
    onMounted(() => initChart(props.dataset, props.option))
    watchEffect(() => initChart(props.dataset, props.option))
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
