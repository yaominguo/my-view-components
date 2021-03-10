<template>
  <div class="my-table">
    <div class="table-title">
      <div
        v-for="(title, index) in layout.header"
        :key="title"
        :style="`flex:${calcWidth[index]}`"
      >
        <p :style="`text-align:${calcAlign[index]}`">
          {{ title.split('*')[0].replace('::', '') }}
        </p>
      </div>
    </div>
    <div class="table-content">
      <div
        v-for="(item, index) in dataSource"
        :key="index"
        :class="{ selectable: selectable }"
        @click.prevent="handleClick(item)"
      >
        <div
          v-for="(key, i) in layout.keys"
          :key="key"
          :style="`flex:${calcWidth[i]}`"
        >
          <p v-if="key.indexOf('>') >= 0" :style="`text-align:${calcAlign[i]}`">
            {{ transValue(item, key) }}
          </p>
          <img
            v-else-if="key.indexOf('#') >= 0 && key.split('#')[1] === 'image'"
            :src="item[key.split('#')[0]]"
            :draggable="false"
            @click.stop="handleViewImage(item[key.split('#')[0]])"
          />
          <p v-else :style="`text-align:${calcAlign[i]}`">
            {{ item[key] }}
          </p>
        </div>
      </div>
    </div>
    <MyModal v-model="showImgModal" title="照片预览">
      <img v-if="showImgModal && imgSrc" style="width: 100%" :src="imgSrc" />
    </MyModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import MyModal from '../MyModal/my-modal.vue'

interface FormatterType {
  [propName: string]: <T>(val: T) => T
}
interface dataType {
  [propName: string]: string | number | string[]
}

export default defineComponent({
  name: 'MyTable',
  displayName: 'm-table',
  components: { MyModal },
  props: {
    template: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<dataType[]>,
      default: () => [],
    },
    formatter: {
      type: Object as PropType<FormatterType>,
      default: null,
    },
    selectable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['select'],
  setup(props, ctx) {
    const layout = computed(() => {
      const { template } = props
      if (!template || template.length < 2) return
      const header = template[0].split('|')
      const keys = template[1].split('|')
      return { header, keys }
    })
    const dataSource = computed(() => props.data)
    const transValue = (item: dataType, key: string) => {
      return (
        props.formatter &&
        props.formatter[key.split('>')[1]](item[key.split('>')[0]])
      )
    }
    const handleClick = (data: dataType) => {
      if (props.selectable) ctx.emit('select', data)
    }
    const calcWidth = computed(() => {
      if (!layout.value) return 1
      return layout.value.header.map((item) => {
        if (item.indexOf('*') >= 0) {
          return item.split('*')[1]
        }
        return 1
      })
    })
    const calcAlign = computed(() => {
      if (!layout.value) return 'center'
      const { length } = layout.value.header
      return layout.value.header.map((item) => {
        const index = item.indexOf('::')
        if (index === 0) return 'left'
        if (index === length) return 'right'
        return 'center'
      })
    })

    const imgSrc = ref<string | null>(null)
    const showImgModal = ref(false)
    const handleViewImage = (src: string) => {
      imgSrc.value = src
      showImgModal.value = true
    }
    return {
      layout,
      dataSource,
      transValue,
      handleClick,
      calcWidth,
      calcAlign,
      imgSrc,
      handleViewImage,
      showImgModal,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-table
  $full()
  p
    padding .05rem
    margin 0
    flex 1
    box-sizing border-box
  .table-title
    display flex
    background $table-title-bg
    color $blue
    font-weight bold
    box-sizing inherit
    >div
      box-sizing inherit
  .table-content
    >div
      display flex
      background $table-content-bg
      box-sizing inherit
      &:nth-child(odd)
        background transparent
      &.selectable
        cursor pointer
        &:hover
          color $table-content-hover-color
          background $table-content-hover-bg
      img
        width 100%
        cursor pointer
</style>
