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
    <m-card title="box2" area="box2"></m-card>
    <m-card title="box3" area="box3"></m-card>
    <div area="box4" style="background:brown;padding:.1rem">
      <h3>columns和rows可以用各种单位，如rem、%、fr等，fr表示比例</h3>
      <h3>此例子表示竖列宽度各自占比 1 : 1.5 : 1</h3>
      <h3>
        此例子表示横排 title 高度为0.4rem，其余为扣除0.4rem后各自占 1 : 1 : 1
      </h3>
    </div>
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
