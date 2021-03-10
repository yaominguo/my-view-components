---
title: MyStep
wrapperClass: my-step
---

# MyStep

步骤条组件

```vue demo
<template>
  <m-step :steps="['第一步', '第二步', '第三步', '第四步']" current="3" />
  <m-step
    :msg="['哈哈哈', `<b style='color:red;'>哈哈哈哈哈</b>`]"
    :steps="['第一步', '第二步', '第三步', '第四步']"
    current="2"
  />
  <m-step
    :msg="['msg1', 'msg2', 'msg3', 'msg4']"
    :steps="['第一步', '第二步', '第三步', '第四步']"
    current="1"
  />
</template>
```

## Props

| props   | description        | type            | default |
| ------- | ------------------ | --------------- | ------- |
| steps   | 节点名称           | string[]        | -       |
| current | 当前节点索引       | number / string | 0       |
| msg     | 每个节点的附加信息 | string[]        | -       |
