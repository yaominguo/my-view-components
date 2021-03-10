---
title: MyTitle
wrapperClass: my-title
---

# MyTitle

大屏标题组件

```vue demo
<template>
  <m-title>XXXXXXX数据平台1</m-title>
  <m-title :bg-img="bgImg">XXXXXXX数据平台2</m-title>
</template>
<script>
import bgImg from '@/assets/images/title-bg2.png'
export default {
  setup() {
    return {
      bgImg,
    }
  },
}
</script>
```

## Props

| props  | description | type  | default      |
| ------ | ----------- | ----- | ------------ |
| bg-img | 背景图片    | Image | title-bg.png |
