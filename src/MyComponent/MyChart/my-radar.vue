<template>
  <div ref="chartRef" class="my-chart" />
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watchEffect } from 'vue'
import { use } from 'echarts/core'
import { RadarChart } from 'echarts/charts'
use([RadarChart])
import useChartGenerate from './useChartGenerate'
import { RadarOption, DatasetComponentOption } from './types'

export default defineComponent({
  name: 'MyRadar',
  displayName: 'm-radar',
  props: {
    dataset: {
      type: Object as PropType<DatasetComponentOption>,
      default: null,
    },
    option: {
      type: Object as PropType<RadarOption>,
      default: null,
    },
  },
  emits: ['init'],
  setup(props, ctx) {
    const defaultOption: RadarOption = {
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
    const defaultSeriesItem = {
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
      defaultOption,
      defaultSeriesItem
    )
    onMounted(() => {
      // eslint-disable-next-line
        ;(defaultOption as any).radar.indicator =
        props.dataset &&
        props.dataset.dimensions &&
        props.dataset.dimensions.map((d) => ({
          name: (d as any).displayName,
          max: (d as any).max,
        }))
      const instance = initChart(props.dataset, props.option)
      instance && ctx.emit('init', instance)
    })
    watchEffect(() => {
      // eslint-disable-next-line
        ;(defaultOption as any).radar.indicator =
        props.dataset &&
        props.dataset.dimensions &&
        props.dataset.dimensions.map((d) => ({
          name: (d as any).displayName,
          max: (d as any).max,
        }))
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
