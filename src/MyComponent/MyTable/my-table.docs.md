---
title: MyTable
wrapperClass: my-table
---

# MyTable

Table 组件

Tag: `m-table`

```vue demo
<template>
  <m-table
    :template="[
      '标题1|标题2*2|标题3*2',
      'key1|key2>customFormatter|key3#image',
    ]"
    :data="tableData"
    :formatter="{ customFormatter }"
  />
</template>
<script>
export default {
  setup() {
    return {
      tableData: [
        {
          key1: '文字1',
          key2: '文字2',
          key3: 'https://avatars2.githubusercontent.com/u/43328103?v=4',
        },
        {
          key1: '文字1',
          key2: '文字2',
          key3: 'https://avatars2.githubusercontent.com/u/43328103?v=4',
        },
        {
          key1: '文字1',
          key2: '文字2',
          key3: 'https://avatars2.githubusercontent.com/u/43328103?v=4',
        },
        {
          key1: '文字1',
          key2: '文字2',
          key3: 'https://avatars2.githubusercontent.com/u/43328103?v=4',
        },
      ],
      customFormatter: (val) => {
        return val + '哈哈哈'
      },
    }
  },
}
</script>
```

## Props

| props                 | description            | type     | default |
| --------------------- | ---------------------- | -------- | ------- |
| [template](#template) | 布局模板               | string[] | -       |
| data                  | 表单数据               | []       | -       |
| formatter             | 数据格式化方法对象集合 | object   | -       |
| selectable            | 是否可触发点击事件     | boolean  | false   |

### <i id="template">template introduction</i>

| tag | description                                                             |
| --- | ----------------------------------------------------------------------- |
| \|  | 将每行划分为 col 块                                                     |
| \*  | 后跟该列所占行的比例                                                    |
| >   | 后跟该项所需使用的 format 数据方法（方法需在 formatter 参数中定义）     |
| #   | 后跟该项所属的特殊类型（目前仅实现 image）                              |
| =   | 放在 template 第一项 col 块头则标题左对齐，尾则右对齐（默认为居中对齐） |

## Events

| events | description                      | arguments |
| ------ | -------------------------------- | --------- |
| select | 开启 selectable 后点击行触发事件 | rowData   |
