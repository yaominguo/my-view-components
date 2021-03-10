---
title: MyCount
wrapperClass: my-count
---

# MyCount

数字跳动展示组件

```vue demo
<template>
  <div><m-count :value="99999" /></div>
  <div><m-count :value="99999" :speed="1" /></div>
  <div><m-count :value="99999" :decimal="2" /></div>
  <div><m-count :value="99999" auto-play :duration="5" /></div>
</template>
```

## Props

| props     | description                              | type            | default |
| --------- | ---------------------------------------- | --------------- | ------- |
| value     | 展示数字                                 | number / string | 0       |
| decimal   | 保留几位小数                             | number / string | 0       |
| speed     | 数字跳动速度（秒）                       | number / string | 2       |
| auto-play | 是否定时自动跳动                         | boolean         | false   |
| duration  | auto-play 开启后，每次跳动间隔时间（秒） | number / string | 10      |
