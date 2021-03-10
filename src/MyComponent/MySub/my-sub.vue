<template>
  <div class="my-sub">
    <div class="title">
      <span />
      <p><slot /></p>
      <div v-if="addition" class="addition">
        <MyCount v-if="addition.value" class="count" :value="addition.value" />
        <span v-if="addition.unit">{{ addition.unit }}</span>
      </div>
      <input
        v-if="searchAble"
        v-model="inputValue"
        :class="{ open: isOpened }"
        class="search-bar"
        type="text"
        @keypress.enter="handleSearch"
      />
      <img
        v-if="searchAble"
        class="search-btn"
        src="@/assets/images/search.png"
        draggable="false"
        @click.prevent="handleOpenSearchBar"
      />
    </div>
    <img src="@/assets/images/sub-dot.png" draggable="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import MyCount from '../MyCount/my-count.vue'

export interface AdditionProp {
  name?: string
  value?: number
  unit?: string
}
export default defineComponent({
  name: 'MySub',
  displayName: 'm-sub',
  components: { MyCount },
  props: {
    addition: {
      type: Object as PropType<AdditionProp>,
      default: null,
    },
    searchAble: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['search'],
  setup(props, ctx) {
    const isOpened = ref(false)
    const inputValue = ref('')
    const handleSearch = () => {
      ctx.emit('search', inputValue.value.trim())
    }
    const handleOpenSearchBar = () => {
      if (!isOpened.value) {
        isOpened.value = true
      } else {
        if (inputValue.value) {
          handleSearch()
        } else {
          isOpened.value = false
        }
      }
    }
    return {
      isOpened,
      inputValue,
      handleSearch,
      handleOpenSearchBar,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-sub
  display flex
  align-items center
  >.title
    display flex
    align-items center
    font-family $font-zcool
    color $secondary-color
    flex 1
    font-size .13rem
    >span
      display inline-block
      width .02rem
      height @width
      background $secondary-color
      margin-right .05rem
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
    .search-bar
      display block
      width 0
      height .16rem
      background rgba(0,0,0,0.1)
      border-radius .02rem
      outline none
      margin 0 .05rem
      padding 0
      box-sizing border-box
      font-family $font-din
      font-size .1rem
      transition all .3s ease-in-out
      opacity 0
      &.open
        width 1rem
        padding .02rem .05rem
        border .01rem solid $blue
        opacity 1
    .search-btn
      width .14rem
      height @width
      cursor pointer
      transition transform .3s ease-in-out
      &:hover
        transform scale(1.3) rotate(360deg)
  >img
    width .6rem
</style>
