<template>
  <div class="my-empty">
    <img src="/src/assets/images/no-data.png" />
    <p>— {{ text }} —</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MyEmpty',
  displayName: 'm-empty',
  props: {
    /** 展示信息 */
    text: {
      type: String as PropType<string>,
      default: '暂无数据',
    },
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-empty
  $center()
  $full()
  flex-direction column
  color #ccc
  font-weight bold
  >img
    width .4rem
    height @width
</style>
