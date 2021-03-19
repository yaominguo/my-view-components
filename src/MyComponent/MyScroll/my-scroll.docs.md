---
title: MyScroll
wrapperClass: my-scroll
---

# MyScroll

轮播组件

Tag: `m-scroll`

```vue demo
<template>
  <div style="display:inline-block;width:50%;height:2rem;overflow:hidden;">
    <m-scroll :length="10" :limit="3">
      <div
        v-for="i in 10"
        :key="i"
        style="height: 0.8rem;text-align:center;background:skyblue;margin-bottom:.05rem;line-height:0.8rem;"
      >
        {{ i }}
      </div>
    </m-scroll>
  </div>
  <div style="display:inline-block;width:50%;height:2rem;overflow:hidden;">
    <m-scroll :length="colors.length" :limit="2" mode="2" :step="2">
      <div
        v-for="color in colors"
        :key="color"
        :style="`height: 2rem;text-align:center;background:${color};line-height:2rem;`"
      >
        {{ color }}
      </div>
    </m-scroll>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const colors = ref(['red', 'blue', 'green', 'brown', 'pink'])
    return {
      colors,
    }
  },
}
</script>
```

## Props

| props    | description                                                     | type            | default |
| -------- | --------------------------------------------------------------- | --------------- | ------- |
| mode     | 模式                                                            | number / string | 1       |
| length   | 数据长度                                                        | number          | -       |
| limit    | 数据长度小于次值则不轮播                                        | number          | -       |
| speed    | mode1 的轮播速度（毫秒）                                        | number          | 50      |
| step     | mode2 的每个元素高度, 有 margin 记得也要把 margin 算进去（rem） | number          | 0       |
| duration | mode2 的轮播间隔（毫秒）                                        | number          | 4000    |
