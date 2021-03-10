---
title: MyModal
wrapperClass: my-modal
---

# MyModal

弹窗组件

```vue demo
<template>
  <m-modal v-model="show" title="这是个弹窗" @close="handleClose">
    <h1>内容……</h1>
  </m-modal>
  <button @click="show = true">Click Me!</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const show = ref(false)
    const handleClose = () => {
      console.log('可以使用close回调，或者直接watch v-model的值进行操作')
    }
    return {
      show,
      handleClose,
    }
  },
}
</script>
```

## Props

| props                | description          | type    | default    |
| -------------------- | -------------------- | ------- | ---------- |
| v-model / modelValue | 值                   | boolean | false      |
| enter                | 进入动画             | string  | fadeInDown |
| leave                | 离开动画             | string  | fadeOutUp  |
| title                | 标题                 | string  | -          |
| width                | 弹窗宽度             | string  | 32%        |
| offset               | 弹窗水平偏移         | string  | 0          |
| mask-closable        | 点击蒙层是否允许关闭 | boolean | true       |

## Events

| events | description      | arguments |
| ------ | ---------------- | --------- |
| close  | 关闭弹窗触发事件 | -         |
