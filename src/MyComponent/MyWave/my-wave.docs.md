---
title: MyWave
wrapperClass: my-wave
---

# MyWave

百分比波浪球组件

Tag: `m-wave`

```vue demo
<template>
  <m-wave :value="67" size=".5rem">67</m-wave>
  <m-wave :value="80" size=".5rem" color="gold">
    <m-count :value="80" />
  </m-wave>
</template>
```

## Props

| props | description | type            | default |
| ----- | ----------- | --------------- | ------- |
| value | 值          | number / string | 0       |
| size  | 球体宽高    | string          | 0.4rem  |
| color | 球体颜色    | string          | #4F953B |
