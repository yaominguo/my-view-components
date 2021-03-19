<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>

<style lang="stylus">
@font-face
  font-family DIN
  src url(./assets/font/DIN-Medium.otf)
@font-face
  font-family Pangmenzhengdao
  src url(./assets/font/pangmenzhengdao.ttf)

html, body
  // background rgba(0,0,0,0.5)
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
  user-select none
  font-size 16vh
  line-height 1.5
  p
    margin 0
#app
  width 100%
  height 100%
  overflow hidden
  font-size .1rem

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: .05rem;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background rgba(64, 158, 255,.5)
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background rgba(64, 158, 255,.5)
}
</style>
