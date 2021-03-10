<template>
  <teleport to="body">
    <MyAnimate :enter="enter" :leave="leave">
      <div
        v-if="modelValue"
        class="my-modal-mask"
        style="animation-duration: 300ms"
        @click.prevent.self="
          () => {
            maskClosable ? closeModal() : null
          }
        "
      >
        <div
          class="my-modal"
          :style="`width:${width};transform: translateX(${offset})`"
        >
          <head>
            <p>
              {{ title }}
              <span class="left" />
              <span class="right" />
            </p>
            <div>
              <img
                src="/src/assets/images/modal-flag.png"
                draggable="false"
                class="flag"
              />
              <img
                src="/src/assets/images/close-btn.png"
                draggable="false"
                class="close-btn"
                @click.prevent="closeModal"
              />
            </div>
            <img
              src="/src/assets/images/modal-title-left.png"
              draggable="false"
              class="left"
            />
          </head>
          <div class="content">
            <slot />
          </div>
        </div>
      </div>
    </MyAnimate>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MyAnimate from '../MyAnimate/my-animate.vue'

export default defineComponent({
  name: 'MyModal',
  displayName: 'm-modal',
  components: { MyAnimate },
  props: {
    /** 值 */
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /** 进入动画 */
    enter: {
      type: String as PropType<string>,
      default: 'fadeInDown',
    },
    /** 离开动画 */
    leave: {
      type: String as PropType<string>,
      default: 'fadeOutUp',
    },
    /** 标题 */
    title: {
      type: String as PropType<string>,
      default: '',
    },
    /** 宽度 */
    width: {
      type: String as PropType<string>,
      default: '32%',
    },
    /** 偏移 */
    offset: {
      type: String as PropType<string>,
      default: '0',
    },
    /** 点击蒙层是否允许关闭 */
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(_, context) {
    const closeModal = () => {
      context.emit('update:modelValue', false)
      context.emit('close')
    }
    return {
      closeModal,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-modal-mask
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background rgba(0,0,0,0.1)
  z-index 9999
  $center()
  .my-modal
    background rgba(0,0,0,0.1)
    color #fff
    $blur()
    z-index 99999
    head
      position relative
      height .4rem
      display flex
      align-items center
      justify-content space-between
      padding 0 .1rem
      margin-bottom .05rem
      background-image repeating-linear-gradient(45deg, $blue, $blue, .01rem, transparent .01rem, transparent .08rem)
      $border($blue)
      >p
        font-size .12rem
        font-weight bold
        padding .02rem .05rem
        position relative
        border-bottom .01rem solid $blue
        span
          position absolute
          width .04rem
          height @width
          background $edge
          bottom -(@height / 2)
          &.left
            left -(@width / 2)
          &.right
            right -(@width / 2)
      >div
        display flex
        align-items center
      img
        z-index 9
        &.close-btn
          width .2rem
          height @width
          cursor pointer
          margin-left .05rem
          transition transform .3s ease-in-out
          &:hover
            transform rotate(90deg)
        &.flag
          height .2rem
        &.left
          position absolute
          left -0.01rem
          height 80%
    .content
      min-height 30vh
      max-height 80vh
      padding .1rem
      overflow-y auto
      overflow-x hidden
      $border($blue)
      border-top none
      font-size .1rem
</style>
