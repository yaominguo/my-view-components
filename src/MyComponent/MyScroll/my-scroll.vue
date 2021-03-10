<template>
  <div class="my-scroll" @mouseenter.prevent="stop" @mouseleave.prevent="start">
    <div ref="contentRef">
      <slot />
      <template v-if="isNeedMockContent">
        <slot />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  nextTick,
} from 'vue'

export default defineComponent({
  name: 'MyScroll',
  displayName: 'm-scroll',
  props: {
    /** 模式 */
    mode: {
      type: [Number, String] as PropType<number | string>,
      default: 1,
    },
    /** 数据长度 */
    length: {
      type: Number as PropType<number>,
      required: true,
    },
    /** 小于此长度则不轮播 */
    limit: {
      type: Number as PropType<number>,
      required: true,
    },
    /** mode1的轮播速度 */
    speed: {
      type: Number as PropType<number>,
      default: 50,
    },
    /** mode2的每个元素高度 */
    step: {
      type: Number as PropType<number>,
      default: 0,
    },
    /** mode2的轮播间隔 */
    duration: {
      type: Number as PropType<number>,
      default: 4000,
    },
  },
  setup(props) {
    const contentRef = ref<null | HTMLElement>(null)
    const timer = ref<null | number>(null)
    const index = ref(0)
    const isNeedMockContent = computed(
      () => props.length <= 100 && props.length >= props.limit
    )
    const start = () => {
      if (!props.length) {
        console.error('MyScroll 需要length参数！')
        return
      }
      if (!props.limit) {
        console.error('MyScroll 需要limit参数！')
        return
      }
      if (props.length < props.limit) return
      if (+props.mode === 2) {
        startMode2()
      } else {
        startMode1()
      }
    }
    const stop = () => {
      clearInterval(Number(timer.value))
      timer.value = null
    }
    const startMode1 = () => {
      const content = contentRef.value
      if (!content) return
      let height = content.offsetHeight / 2
      timer.value = +setInterval(() => {
        if (height <= 0) {
          height = content.offsetHeight
          return
        }

        if (index.value < height) {
          index.value += 1
        } else {
          index.value = 0
        }
        content.style.transform = `translateY(${-index.value}px)`
      }, props.speed)
    }
    const startMode2 = () => {
      if (!props.step) {
        console.error('MyScroll mode2模式需要step参数！')
        return
      }
      const content = contentRef.value
      if (!content) return
      const len = ((content.children && content.children.length) || 0) / 2
      timer.value = +setInterval(() => {
        if (index.value < len) {
          index.value += 1
          content.style.transition = 'transform 0.5s ease-in-out'
        } else {
          index.value = 0
          content.style.transition = 'none'
        }
        content.style.transform = `translateY(${-props.step * index.value}rem)`
      }, props.duration)
    }
    onMounted(() => {
      start()
    })
    onBeforeUnmount(() => {
      stop()
    })
    watch(
      () => props.length,
      async () => {
        stop()
        index.value = 0
        const content = contentRef.value
        content && (content.style.transform = 'translateY(0)')
        await nextTick()
        start()
      }
    )
    return {
      isNeedMockContent,
      start,
      stop,
      contentRef,
      timer,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-scroll
  $full()
  overflow hidden
  z-index 99
</style>
