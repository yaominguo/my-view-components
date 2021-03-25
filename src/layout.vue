<template>
  <m-grid
    class="layout-grid"
    :template="['title title', 'menu content']"
    columns="1.8rem 1fr"
    rows="0.4rem 1fr"
    gap=".1rem"
    style="padding: 0"
  >
    <div class="title" area="title">
      <span @click="toPage('home')">MyViewComponents</span>
    </div>
    <div class="menu" area="menu">
      <div
        v-for="menu in menus"
        :key="menu.name"
        :class="{ on: curName === menu.name }"
        @click="toPage(menu.name)"
      >
        {{ menu.name }}
      </div>
    </div>
    <div class="content" area="content">
      <router-view />
    </div>
  </m-grid>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import menus from './menu'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'Layout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const curName = computed(() => route.name)
    const toPage = (name: string) => router.push({ name })
    return {
      menus,
      toPage,
      curName,
    }
  },
})
</script>

<style lang="stylus" scoped>
$blue(opacity = 1)
  rgba(64, 158, 255, opacity)
$hover-color = rgb(236, 245, 255)
.layout-grid
  color #2c3e50
  font-size .1rem
  .title
    color $blue()
    display flex
    align-items center
    font-size .2rem
    font-weight bold
    padding 0 .2rem
    box-shadow 0 .02rem .05rem 0 rgba(0, 0, 0, .1)
    >span
      position relative
      z-index 10
      cursor pointer
      transition color .2s ease-in-out
      &:before
        z-index -1
        content ''
        position absolute
        top 0
        bottom 0
        left -0.25em
        right -0.25em
        background $blue()
        transform-origin center right
        transform scaleX(0)
        transition transform .2s ease-in-out
      &:hover
        color #fff
      &:hover::before
        transform-origin center left
        transform scaleX(1)
  .menu
    font-size .13rem
    font-weight 500
    display flex
    flex-direction column
    padding-left .1rem
    padding-bottom .1rem
    >div
      display flex
      align-items center
      flex 1
      cursor pointer
      padding 0 .1rem
      transition all .3s ease-in-out
      &.on
        color $blue()
        border-right .05rem solid @color
        box-shadow 0 .02rem .05rem 0 $blue(0.5)
      &.on
      &:hover
        background $hover-color
  .content
    overflow-x hidden
    overflow-y auto
    padding 0 .2rem 1rem
</style>
