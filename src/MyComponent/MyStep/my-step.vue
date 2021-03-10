<template>
  <div class="my-step">
    <div
      class="lines"
      :style="{ transform: `translateY(calc(${iconTop}px + 0.035rem))` }"
    >
      <div class="line done" :style="`width:${doneWidth}%`" />
      <div class="line" :style="`width:${undoneWidth}%`" />
    </div>
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="item"
      :class="{ on: i == current }"
    >
      <p :title="step">
        {{ step }}
      </p>
      <div v-if="i <= current" ref="iconRef" class="icon" />
      <div v-else class="none"></div>
      <span class="msg" :title="msg[i]" v-html="msg[i]" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
} from 'vue'

export default defineComponent({
  name: 'MyStep',
  displayName: 'm-step',
  props: {
    steps: {
      type: Array as PropType<string[]>,
      required: true,
    },
    current: {
      type: [Number, String] as PropType<number | string>,
      default: 0,
    },
    msg: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const iconRef = ref<null | HTMLElement>(null)
    const linePercent = computed(() => {
      const { length } = props.steps
      if (length > 2) return 100 / (length - 1)
      return 100
    })
    const doneWidth = computed(() => {
      if (Number.isNaN(+props.current)) {
        console.error('MyStep组件传入的current参数是NaN!')
        return 0
      }
      return Math.round(linePercent.value * +props.current)
    })
    const undoneWidth = computed(() => 100 - doneWidth.value)
    const iconTop = ref(0)
    onMounted(async () => {
      await nextTick()
      iconTop.value = (iconRef.value as HTMLElement).offsetTop
    })
    return {
      iconRef,
      linePercent,
      doneWidth,
      undoneWidth,
      iconTop,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-step
  width 90%
  margin .05rem auto 0
  display flex
  justify-content space-between
  position relative
  font-size .09rem
  .lines
    width 100%
    display flex
    position absolute
    left -0.05rem
    .line
      height .03rem
      background rgba(0,0,0,0.8)
      border-radius .1rem
      margin-left .05rem
      &.done
        background linear-gradient(to right, $blue, $edge)
  .item
    position relative
    text-align center
    width .1rem
    z-index 1
    .icon
      width .1rem
      height @width
      border-radius 50%
      background url('@/assets/images/true.png') center center / 60% 60% no-repeat
      background-color $edge
    .none
      width .06rem
      height @width
      border .02rem solid $edge
      background rgba(0,0,0,0.8)
      border-radius 50%
    .msg
      display inline-block
      font-size .06rem
      width 1rem
      transform translateX(-50%)
      margin .02rem 50%
      font-weight normal
      color #aaa
    p
      width .8rem
      margin .05rem 50%
      transform translateX(-50%)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      color #ccc
      font-size .08rem
    &.on
      .icon
        transform scale(1.2)
        box-shadow 0 0 .05rem .01rem $edge
      p
        color $edge
        font-weight bold
</style>
