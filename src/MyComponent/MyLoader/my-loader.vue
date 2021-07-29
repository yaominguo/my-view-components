<template>
  <teleport to="#MyLoader">
    <div class="my-loader-mask">
      <div class="my-loader">
        <div class="outer" />
        <div class="middle" />
        <div class="inner" />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'
export default defineComponent({
  name: 'MyLoader',
  displayName: 'm-loader',
  setup() {
    useDOMCreate('MyLoader')
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-loader-mask
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background rgba(0,0,0,0.3)
  z-index 99999
  $center()
.my-loader
  position relative
  .outer,
  .middle,
  .inner
    border .03rem solid transparent
    border-top-color #47B3FF
    border-right-color @border-top-color
    border-radius 50%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%) rotate(0deg)
  .outer
    width .35rem
    height @width
    animation spin 2.5s linear infinite
  .middle
    width .21rem
    height @width
    animation spin 2s linear reverse infinite
  .inner
    width .08rem
    height @width
    animation spin 1.5s linear infinite
@keyframes spin {
  to {
    transform translate(-50%, -50%) rotate(360deg)
    border-top-color #00f2ff
    border-right-color @border-top-color
  }
}
</style>
