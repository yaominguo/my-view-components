---
title: MyLoader
wrapperClass: my-loader
---

# MyLoader

Loading 组件

Tag: `m-loader`

```vue demo
<template>
  <m-loader v-if="show" />
  <button @click="handleClick">Click Me !</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const show = ref(false)
    const handleClick = () => {
      show.value = true
      setTimeout(() => {
        show.value = false
      }, 3000)
    }
    return {
      show,
      handleClick,
    }
  },
}
</script>
```

## Props

| props | description | type | default |
| ----- | ----------- | ---- | ------- |
| -     | -           | -    | -       |
