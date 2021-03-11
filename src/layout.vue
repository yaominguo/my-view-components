<template>
  <m-grid
    class="layout-grid"
    :template="['title title', 'menu content']"
    columns="2rem 1fr"
    rows="0.4rem 1fr"
    gap=".1rem"
  >
    <div class="title" area="title">MyViewComponents</div>
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
    <div class="content" area="content"><router-view /></div>
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
$border = 1px solid #e6e6e6
$hover-color = rgb(236, 245, 255)
.layout-grid
  color #2c3e50
  font-size 12px
  .title
    display flex
    align-items center
    font-size 20px
    font-weight bold
    padding 0 10px
    border-bottom $border
  .menu
    font-size 14px
    >div
      line-height 4
      cursor pointer
      padding 0 10px
      &.on
        color rgb(64, 158, 255)
        border-right 4px solid @color
      &.on
      &:hover
        background $hover-color
  .content
    overflow-x hidden
    overflow-y auto
    padding 0 20px 200px
</style>
