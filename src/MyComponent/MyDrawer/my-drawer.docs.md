---
title: MyDrawer
wrapperClass: my-drawer
---

# MyDrawer

侧边抽屉组件

```vue demo
<template>
  <m-drawer v-model="show" @close="handleClose">
    <h1>内容……</h1>
  </m-drawer>
  <button @click="show = true">Click Me!</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const show = ref(false)
    const handleClose = () => {
      console.log(
        '可以使用close回调，或者直接watch v-model的值进行关闭后的操作'
      )
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

| props                | description | type    | default |
| -------------------- | ----------- | ------- | ------- |
| v-model / modelValue | 值          | boolean | false   |
| width                | 抽屉宽度    | string  | 49vw    |

## Events

| events | description      | arguments |
| ------ | ---------------- | --------- |
| close  | 关闭抽屉触发事件 | -         |
