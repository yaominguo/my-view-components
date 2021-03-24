<template>
  <div id="MapContainer" />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'MyMap',
  displayName: 'm-map',
})
</script>

<style lang="stylus" scoped>
#MapContainer
  position fixed
  top 0
  right 0
  bottom 0
  left 0
</style>
<style lang="stylus">
.amap-logo
.amap-copyright
  display none !important
.amap-icon
  img
    width 100%
    height 100%
</style>
