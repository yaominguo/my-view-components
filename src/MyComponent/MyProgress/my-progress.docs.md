---
title: MyProgress
wrapperClass: my-progress
---

# MyProgress

进度条组件

```vue demo
<template>
  <m-progress :value="80" />
  <m-progress
    :value="67"
    :msg="{ name: '测试', value: 67, unit: '%' }"
    :color="['red', 'gold']"
  />
</template>
```

## Props

| props       | description               | type              | default                |
| ----------- | ------------------------- | ----------------- | ---------------------- |
| color       | 进度条颜色 如为数组则渐变 | string / string[] | ['#0094FF', '#1EFBFF'] |
| value       | 进度百分值                | number            | 0                      |
| [msg](#msg) | 附加信息                  | object            | -                      |
| height      | 进度条高度(rem)           | number            | 0.07                   |

### <i id="msg">msg props</i>

| props | description | type   | default |
| ----- | ----------- | ------ | ------- |
| name  | 名字        | string | -       |
| value | 展示值      | number | -       |
| unit  | 值后边单位  | string | -       |
