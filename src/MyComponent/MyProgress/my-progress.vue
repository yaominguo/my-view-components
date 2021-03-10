<template>
  <div class="my-progress">
    <div v-if="msg" class="msg">
      <p v-if="msg.name">{{ msg.name }}</p>
      <p v-if="msg.value">
        <MonitorCount :value="msg.value" />
        <span v-if="msg.unit">{{ msg.unit }}</span>
      </p>
    </div>
    <div class="bar" :style="{ height: `${height}rem` }">
      <div class="inner" :style="{ width: `${percent}%`, ...barColor }"></div>
      <div class="bg" :style="bgColor"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import MonitorCount from '../MyCount/my-count.vue'

export interface ProgressProps {
  name?: string
  value?: number
  unit?: string
}
export default defineComponent({
  name: 'MyProgress',
  displayName: 'm-progress',
  components: { MonitorCount },
  props: {
    /** 进度条颜色 如为数组则渐变 */
    color: {
      type: [String, Array] as PropType<string | string[]>,
      default: () => ['#0094FF', '#1EFBFF'],
    },
    /** 进度百分值 */
    value: {
      type: Number as PropType<number>,
      default: 0,
    },
    /** 附加信息 */
    msg: {
      type: Object as PropType<ProgressProps>,
      default: null,
    },
    /** 进度条高度 */
    height: {
      type: Number as PropType<number>,
      default: 0.07,
    },
  },
  setup(props) {
    const barColor = computed(() => {
      if (Array.isArray(props.color)) {
        return {
          background: `linear-gradient(to right, ${props.color[0]}, ${props.color[1]})`,
        }
      }
      return { background: props.color }
    })
    const bgColor = computed(() => {
      if (Array.isArray(props.color)) {
        return {
          background: props.color[0],
        }
      }
      return { background: props.color }
    })
    const percent = ref(0)
    onMounted(() => {
      setTimeout(() => {
        percent.value = props.value > 100 ? 100 : props.value
      }, 500)
    })
    return {
      barColor,
      bgColor,
      percent,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'

.my-progress
  width 100%
  .msg
    display flex
    align-items center
    justify-content space-between
    padding 0 .05rem
    >p
      color #ccc
      &:last-child
        color $secondary-color
        font-size .14rem
        font-weight bold
        span
          font-size .1rem
  .bar
    width 100%
    position relative
    border-radius .1rem
    >div
      position absolute
      border-radius inherit
      left 0
      right 0
      bottom 0
      top 0
      &.inner
        transition width .5s ease-in-out
      &.bg
        opacity .3
</style>
