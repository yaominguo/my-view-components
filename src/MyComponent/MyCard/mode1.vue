<template>
  <div class="card-wrapper">
    <div class="card-title">
      <p>
        {{ title }}
      </p>
    </div>
    <div class="card-content">
      <span class="border" />
      <span class="border" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Mode1',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
})
</script>

<style scoped lang="stylus">
@import '../main.styl'
.card-wrapper
  .card-title
    display flex
    background url('@/assets/images/card-mode1-header.png') left bottom / 100% 60% no-repeat
    >p
      color $card-title-color
      font-size $card-title-size
      font-weight bold
      background url('@/assets/images/card-mode1-title.png') left bottom / 100% 60% no-repeat
      padding 0 .2rem
      margin 0
  .card-content
    position relative
    box-sizing border-box
    background $card-bg
    padding .05rem
    border-bottom $card-border
    >.border
      display block
      position absolute
      top 0
      left 0
      bottom 0
      width .01rem
      background linear-gradient(to bottom, rgba(148,236,255, 0), rgba(91,214,255,.5))
      &:nth-of-type(2)
        left auto
        right 0
    >div
      $full()
</style>
