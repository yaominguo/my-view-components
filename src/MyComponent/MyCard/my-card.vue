<template>
  <MyAnimate :enter="enter" :leave="leave">
    <div class="my-card">
      <component :is="card" :title="title" v-bind="$attrs">
        <slot />
      </component>
    </div>
  </MyAnimate>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import MyAnimate from '../MyAnimate/my-animate.vue'
import mode1 from './mode1.vue'
import mode2 from './mode2.vue'

export default defineComponent({
  name: 'MyCard',
  displayName: 'm-card',
  components: {
    MyAnimate,
    mode1,
    mode2,
  },
  props: {
    /** 标题名 */
    title: {
      type: String as PropType<string>,
      required: true,
    },
    /** 模式选择 默认为1 */
    mode: {
      type: [String, Number] as PropType<string | number>,
      default: '1',
    },
    /** 进入动画名 */
    enter: {
      type: String as PropType<string>,
      default: 'fadeInLeft',
    },
    /** 离开动画名 */
    leave: {
      type: String as PropType<string>,
      default: 'fadeOutLeft',
    },
  },
  setup(props) {
    const card = computed(() => {
      switch (props.mode) {
        case '1':
          return mode1
        case '2':
          return mode2
        default:
          return mode1
      }
    })
    return {
      card,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-card
  $full()
  width initial
  height initial
  overflow hidden
  z-index 10
  :deep(.card-wrapper)
    $full()
    // padding .05rem .1rem
    position relative
  :deep(.card-title)
    max-height .2rem
  :deep(.card-content)
    height calc(100% - .2rem)
    overflow-y auto
    overflow-x hidden
    $blur()
</style>
