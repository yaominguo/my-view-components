---
title: MyChart
wrapperClass: my-chart
---

# MyChart

在 [ECharts5](https://echarts.apache.org/zh/index.html)基础上封装的图表组件

以一套数据尽量支持多种图表的目的，实现配置与数据分离。

`如以下三种图表使用同一套数据展示：`

```vue demo
<template>
  <div
    style="display:inline-block;width:33.3%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-bar :dataset="chartData" />
  </div>
  <div
    style="display:inline-block;width:33.3%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-line :dataset="chartData" />
  </div>
  <div
    style="display:inline-block;width:33.3%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-pie :dataset="chartData" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const chartData = ref(null)
    setTimeout(() => {
      chartData.value = {
        dimensions: [
          { name: 'name', displayName: '日期' },
          { name: 'data1', displayName: '数据1' },
          { name: 'data2', displayName: '数据2' },
          { name: 'data3', displayName: '数据3' },
        ],
        source: [
          { name: '周一', data1: 100, data2: 200, data3: 300 },
          { name: '周二', data1: 110, data2: 210, data3: 320 },
          { name: '周三', data1: 120, data2: 230, data3: 340 },
          { name: '周四', data1: 130, data2: 240, data3: 360 },
          { name: '周五', data1: 140, data2: 250, data3: 380 },
          { name: '周六', data1: 150, data2: 260, data3: 390 },
          { name: '周日', data1: 150, data2: 260, data3: 390 },
        ],
      }
    }, 1000)
    return {
      chartData,
    }
  },
}
</script>
```

自定义配置项与 [ECharts 配置项](https://echarts.apache.org/zh/option.html#title) 保持一致，数据采用 [dataset](https://echarts.apache.org/zh/tutorial.html#使用%20dataset%20管理数据)方式传入。

`（当然也可以不传 dataset 参数，直接在 series.data 配置项中填入数据也可）`

## my-bar

柱状图

Tag: `m-bar`

```vue demo
<template>
  <div style="width:100%;height:30vh;background:rgba(5,71,138,0.5);">
    <m-bar :dataset="chartData" :option="option" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const chartData = ref(null)
    setTimeout(() => {
      chartData.value = {
        dimensions: [
          { name: 'name', displayName: '坐标名' },
          { name: 'data1', displayName: '数据1' },
          { name: 'data2', displayName: '数据2' },
          { name: 'data3', displayName: '数据3' },
        ],
        source: [
          { name: '周一', data1: 100, data2: 200, data3: 300 },
          { name: '周二', data1: 110, data2: 210, data3: 320 },
          { name: '周三', data1: 120, data2: 230, data3: 340 },
          { name: '周四', data1: 130, data2: 240, data3: 360 },
          { name: '周五', data1: 140, data2: 250, data3: 380 },
          { name: '周六', data1: 150, data2: 260, data3: 390 },
          { name: '周日', data1: 150, data2: 260, data3: 390 },
        ],
      }
    }, 1000)
    return {
      chartData,
      option: {
        // 特制的color，其中有数组则为渐变
        color: ['#4892ff', ['#fddd60', '#ffb11b'], '#7bffb3'],
        series: [
          {
            type: 'bar',
            stack: '总量',
          },
          {
            type: 'bar',
            stack: '总量',
            barWidth: '20%',
          },
          // 柱状图和折线图可以混用
          {
            type: 'line',
          },
        ],
      },
    }
  },
}
</script>
```

## my-line

折线图

Tag: `m-line`

```vue demo
<template>
  <div style="width:100%;height:30vh;background:rgba(5,71,138,0.5);">
    <m-line :dataset="chartData" :option="option" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const chartData = ref(null)
    setTimeout(() => {
      chartData.value = {
        dimensions: [
          { name: 'name', displayName: '坐标名' },
          { name: 'data1', displayName: '数据1' },
          { name: 'data2', displayName: '数据2' },
          { name: 'data3', displayName: '数据3' },
        ],
        source: [
          { name: '周一', data1: 100, data2: 200, data3: 300 },
          { name: '周二', data1: 110, data2: 210, data3: 320 },
          { name: '周三', data1: 120, data2: 230, data3: 340 },
          { name: '周四', data1: 130, data2: 240, data3: 360 },
          { name: '周五', data1: 140, data2: 250, data3: 380 },
          { name: '周六', data1: 150, data2: 260, data3: 390 },
          { name: '周日', data1: 150, data2: 260, data3: 390 },
        ],
      }
    }, 1000)
    return {
      chartData,
      option: {
        series: [
          {
            type: 'line',
            areaStyle: {},
            stack: '总量',
          },
          {
            type: 'line',
            areaStyle: {},
            stack: '总量',
          },
          {
            type: 'line',
            areaStyle: {},
            stack: '总量',
          },
        ],
      },
    }
  },
}
</script>
```

## my-pie

饼图

Tag: `m-pie`

```vue demo
<template>
  <div
    style="display:inline-block;width:50%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-pie :dataset="chartData" />
  </div>
  <div
    style="display:inline-block;width:50%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-pie :dataset="chartData" :option="option" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const chartData = ref(null)
    setTimeout(() => {
      chartData.value = {
        dimensions: [
          { name: 'name', displayName: '日期' },
          { name: 'value', displayName: '值' },
        ],
        source: [
          { name: '周一', value: 100 },
          { name: '周二', value: 210 },
          { name: '周三', value: 320 },
          { name: '周四', value: 430 },
          { name: '周五', value: 340 },
          { name: '周六', value: 250 },
          { name: '周日', value: 150 },
        ],
      }
    }, 1000)
    return {
      chartData,
      option: {
        legend: { show: false },
        series: [
          {
            type: 'pie',
            roseType: 'radius',
            radius: ['10%', '60%'],
          },
        ],
      },
    }
  },
}
</script>
```

## my-radar

雷达图

Tag: `m-radar`

```vue demo
<template>
  <div
    style="display:inline-block;width:50%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-radar :dataset="chartData" :option="{ legend: { show: false } }" />
  </div>
  <div
    style="display:inline-block;width:50%;height:30vh;background:rgba(5,71,138,0.5);"
  >
    <m-radar :dataset="chartData2" :option="option" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const chartData = ref(null)
    const chartData2 = ref(null)
    const option = ref({
      color: [['#FF9D27', 'red']],
      legend: {
        show: false,
      },
      radar: {
        axisName: {
          // 使用false会连tooltip都没有分类名
          // show: false,
          color: 'transparent',
        },
        splitArea: {
          areaStyle: {
            color: [
              'rgba(0,0,0,.9)',
              'rgba(0,0,0,.7)',
              'rgba(0,0,0,.5)',
              'rgba(0,0,0,.3)',
              'rgba(0,0,0,.1)',
            ],
          },
        },
        radius: '80%',
      },
    })
    setTimeout(() => {
      chartData.value = {
        dimensions: [
          { name: 'data0', displayName: '维度0', max: 500 },
          { name: 'data1', displayName: '维度1', max: 500 },
          { name: 'data2', displayName: '维度2', max: 500 },
          { name: 'data3', displayName: '维度3', max: 500 },
        ],
        source: [
          {
            seriesName: '周一',
            data0: 350,
            data1: 200,
            data2: 250,
            data3: 300,
          },
          {
            seriesName: '周二',
            data0: 150,
            data1: 310,
            data2: 210,
            data3: 420,
          },
          {
            seriesName: '周三',
            data0: 150,
            data1: 110,
            data2: 210,
            data3: 500,
          },
        ],
      }
      chartData2.value = {
        dimensions: [
          { name: 'class1', displayName: '分类1', max: 500 },
          { name: 'class2', displayName: '分类2', max: 500 },
          { name: 'class3', displayName: '分类3', max: 500 },
          { name: 'class4', displayName: '分类4', max: 500 },
          { name: 'class5', displayName: '分类5', max: 500 },
        ],
        source: [
          {
            seriesName: '分类排行',
            class1: 350,
            class2: 320,
            class3: 450,
            class4: 300,
            class5: 430,
          },
        ],
      }
    }, 1000)
    return {
      chartData,
      chartData2,
      option,
    }
  },
}
</script>
```

## my-scatter

散点图

Tag: `m-scatter`

```vue demo
<template>
  <div style="width:100%;height:30vh;background:rgba(5,71,138,0.5);">
    <m-scatter :option="option" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const option = ref(null)
    setTimeout(() => {
      option.value = {
        xAxis: {
          show: false,
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: ['rgba(255,255,255,.2)', 'rgba(255,255,255,.4)'],
            },
          },
        },
        series: [
          {
            type: 'effectScatter',
            symbolSize: 20,
            data: [
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
            ],
          },
          {
            type: 'scatter',
            data: [
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [10.03, 5.24],
              [10.0, 8.04],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
          },
        ],
      }
    }, 1000)
    return {
      option,
    }
  },
}
</script>
```

## Props

| props                                                                            | description | type                  | default |
| -------------------------------------------------------------------------------- | ----------- | --------------------- | ------- |
| [dataset](https://echarts.apache.org/zh/tutorial.html#使用%20dataset%20管理数据) | 数据集      | {dimensions?, source} | -       |
| [option](https://echarts.apache.org/zh/option.html#title)                        | 配置        | {...}                 | -       |

## Events

| events | description        | arguments        |
| ------ | ------------------ | ---------------- |
| init   | 图表初始化返回实例 | (instance) => {} |
