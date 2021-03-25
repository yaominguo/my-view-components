---
title: MyGrid
wrapperClass: my-grid
---

# MyGrid

大屏布局组件

Tag: `m-grid`

```vue demo
<template>
  <!-- 真实使用中不需要这个min-height, m-grid默认高度为父容器的100% -->
  <m-grid
    style="min-height: 50vh;"
    :template="[
      'title title title',
      'box1 . box3',
      'box2 . box3',
      'box2 box4 box4',
    ]"
    columns="1fr 1.5fr 1fr"
    rows="0.4rem 1fr 1fr 1fr"
  >
    <m-title area="title">大标题</m-title>
    <div area="box1" style="background:skyblue;padding:.1rem">
      <h3>有area名的元素会被摆放至template中的同名位置</h3>
    </div>
    <m-card title="box2" area="box2">
      <m-grid
        :template="['inner1 inner2 inner3', 'inner4 inner4 inner3']"
        columns="1rem 20% auto"
        rows="30% 1fr"
      >
        <div area="inner1" style="background:gold"></div>
        <div area="inner2" style="background:gold"></div>
        <div area="inner3" style="background:gold"></div>
        <div area="inner4" style="background:gold"></div>
      </m-grid>
    </m-card>
    <m-card title="box3" area="box3"></m-card>
    <div area="box4" style="background:brown;padding:.1rem"></div>
  </m-grid>
</template>
```

## Props

| props    | description  | type     | default |
| -------- | ------------ | -------- | ------- |
| template | 区块摆放模板 | string[] | -       |
| columns  | 列宽比例     | string   | -       |
| rows     | 行高比例     | string   | -       |
| gap      | 区块间隔     | string   | 0.05rem |
