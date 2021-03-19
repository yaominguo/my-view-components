---
title: MyAnimate
wrapperClass: my-animate
---

# MyAnimate

基于[animate.css](https://animate.style/)封装的动画组件，对包裹其中的元素实现进入、离开时的动画。

Tag: `m-animate`

```vue demo
<template>
  <m-animate enter="fadeInLeft" leave="fadeOutLeft">
    <h1 v-show="show">Animate 1</h1>
  </m-animate>
  <m-animate enter="zoomInDown" leave="zoomOutUp">
    <h1 v-show="show">Animate 2</h1>
  </m-animate>
  <m-animate enter="slideInRight" leave="slideOutRight">
    <h1 v-show="show">Animate 3</h1>
  </m-animate>
  <button @click="show = !show">Click Me!</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const show = ref(true)
    return {
      show,
    }
  },
}
</script>
```

## Props

| props    | description        | type   | default |
| -------- | ------------------ | ------ | ------- |
| enter    | 进入动画名         | string | -       |
| leave    | 离开动画名         | string | -       |
| duration | 动画执行时间(毫秒) | number | 500     |
