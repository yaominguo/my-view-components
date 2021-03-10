<template>
  <div class="card-wrapper">
    <div class="card-title">
      {{ title }}
      <div v-if="addition" class="addition">
        <MyCount v-if="addition.value" class="count" :value="addition.value" />
        <span v-if="addition.unit">{{ addition.unit }}</span>
      </div>
      <img class="tri" src="@/assets/images/modal-head-tri.png" />
      <img class="flag" :src="flag" />
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import flag from '@/assets/images/card-model2-flag.png'
import MyCount from '../MyCount/my-count.vue'

export interface AdditionProp {
  name?: string
  value?: number
  unit?: string
}
export default defineComponent({
  name: 'Mode2',
  components: { MyCount },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    addition: {
      type: Object as PropType<AdditionProp>,
      default: null,
    },
  },
  setup() {
    return {
      flag,
    }
  },
})
</script>

<style scoped lang="stylus">
@import '../main.styl'
.card-wrapper
  $full()
  .card-title
    display flex
    background linear-gradient(to bottom, transparent, rgba(0,148,255,.3))
    position relative
    color $card-title-color
    font-size $card-title-size
    height .2rem
    font-weight bold
    padding-left .2rem
    align-items center
    font-size .13rem
    box-sizing border-box
    border-bottom .01rem solid $primary-border
    .tri
      position absolute
      left 0
      width .2rem
    .flag
      position absolute
      height 100%
      right .05rem
    .addition
      display flex
      align-items center
      margin-left .1rem
      .count
        color $yellow
        font-size .15rem
        font-family $font-pang
        padding-bottom .03rem
      span
        color #aaa
        font-size .08rem
        margin-left .05rem
  .card-content
    display flex
    background $primary-bg
    flex-direction column
    justify-content space-around
    position relative
    box-sizing border-box
    padding .02rem .05rem
    overflow hidden !important
    >div
      $full()
</style>
