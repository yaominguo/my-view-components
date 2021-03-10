---
title: MyCard
wrapperClass: my-card
---

# MyCard

模块包裹组件

```vue demo
<template>
  <m-card title="这是标题"><h1>内容或组件</h1></m-card>
  <m-card title="这是标题" mode="2"><h1>内容或组件</h1></m-card>
</template>
```

## Props

| props | description | type            | default     |
| ----- | ----------- | --------------- | ----------- |
| title | 标题名      | string          | -           |
| mode  | 模式选择    | string / number | 1           |
| enter | 进入动画名  | string          | fadeInLeft  |
| leave | 离开动画名  | string          | fadeOutLeft |
