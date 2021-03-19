---
title: MyForm
wrapperClass: my-form
---

# MyForm

Form 表单组件

Tag: `m-form`

### Basic Use

```vue demo
<template>
  <m-form
    :template="[
      'key1:标题1|key2:标题2|key3:标题3',
      'key4:标题4|key5:标题5|key6:标题6',
    ]"
    :data="formData"
  />
</template>
<script>
export default {
  setup() {
    return {
      formData: {
        key1: '测试1',
        key2: '测试2',
        key3: '测试3',
        key4: '测试4',
        key5: '测试5',
        key6: '测试6',
      },
    }
  },
}
</script>
```

### Advanced Use

```vue demo
<template>
  <m-form
    :template="[
      'name:小区名称|address:小区地址*3',
      'belong:所属居委会|buildingNum:总门牌幢数|roomNum:总户数>formatRoomNum|',
      '||buildingArea:总建筑面积>formatArea|area:占地面积>formatArea',
      'rang:小区四至范围|excludeRang:四至范围不包括',
      'photo:照片#image',
    ]"
    :data="formData"
    :formatter="formatter"
  />
</template>
<script>
export default {
  setup() {
    return {
      formData: {
        name: '测试文字',
        photo: 'https://avatars2.githubusercontent.com/u/43328103?v=4',
        address: '测试文字',
        belong: '测试文字',
        buildingNum: '测试文字',
        roomNum: '测试文字',
        buildingArea: '测试文字',
        area: '测试文字',
        rang: '测试文字',
        excludeRang: '测试文字',
      },
      formatter: {
        formatArea: (area) => area + '㎡',
        formatRoomNum: (val) => val + '万户',
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
| data                  | 表单数据               | object   | -       |
| formatter             | 数据格式化方法对象集合 | object   | -       |
| label-width           | label 宽度             | string   | 1rem    |

### <i id="template">template introduction</i>

| tag | description                                                              |
| --- | ------------------------------------------------------------------------ |
| \|  | 将每行划分为 col 块                                                      |
| :   | 冒号前为数据 key，冒号后为 label 名称                                    |
| \*  | 后跟该 col 块所占行的比例                                                |
| >   | 后跟该 col 块所需使用的 format 数据方法（方法需在 formatter 参数中定义） |
| #   | 后跟该 col 块所属的特殊类型（目前仅实现 image）                          |
| =   | 放在 col 块头则 label 左对齐，尾则右对齐（默认为右对齐）                 |
