<template>
  <transition
    name="animate__animated"
    class="animate__animated"
    :enter-active-class="`animate__${enter}`"
    :leave-active-class="`animate__${leave}`"
    :style="`animation-duration: ${duration}ms`"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MyAnimate',
  displayName: 'm-animate',
  props: {
    /** 进入动画 */
    enter: {
      type: String as PropType<string>,
      required: true,
    },
    /** 离开动画 */
    leave: {
      type: String as PropType<string>,
      required: true,
    },
    /** 动画执行时间 */
    duration: {
      type: Number as PropType<number>,
      default: 500,
    },
  },
})
</script>
