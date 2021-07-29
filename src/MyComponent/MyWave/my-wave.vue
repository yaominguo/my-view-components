<template>
  <div
    class="my-wave-ball"
    :style="{
      width: size,
      height: size,
      borderColor: color,
      boxShadow: `0 0 .08rem 0 ${color} inset`,
    }"
  >
    <div
      v-if="value"
      class="before"
      :style="{ top: `${percent}%`, background: color }"
    />
    <div
      v-if="value"
      class="after"
      :style="{ top: `${percent}%`, background: color }"
    />
    <p><slot /></p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MyWave',
  displayName: 'm-wave',
  props: {
    /** 值 */
    value: {
      type: [Number, String] as PropType<number | string>,
      default: 0,
    },
    /** 球体宽高  默认0.4rem */
    size: {
      type: String as PropType<string>,
      default: '.4rem',
    },
    /** 球体颜色 默认#4F953B */
    color: {
      type: String as PropType<string>,
      default: '#4F953B',
    },
  },
  setup(props) {
    const percent = computed(() => 250 - +props.value)
    return {
      percent,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-wave-ball
  position relative
  background transparent
  border-radius 50%
  overflow hidden
  border .02rem solid
  box-sizing content-box
  transform translateZ(0)
  $center()
  p
    z-index 30
  .before
  .after
    content ''
    position absolute
    width 200%
    height @width
    left 50%
    opacity .5
    border-radius 40%
    animation rotate 10s ease infinite alternate
    z-index 20
  .after
    radius 30%
    opacity .8
    width 195%
    height @width
    animation rotate 20s linear infinite alternate
    z-index 10
@keyframes rotate {
  from {
    transform translate(-46%, -70%) rotate(0)
  }
  to {
    transform translate(-50%, -72%) rotate(360deg)
  }
}
</style>
