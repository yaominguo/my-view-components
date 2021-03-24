<template>
  <div class="my-table">
    <div class="table-title">
      <div
        v-for="(title, index) in layout.header"
        :key="title"
        :style="`flex:${calcWidth[index]}`"
      >
        <p :style="`text-align:${calcAlign[index]}`">
          {{ title.split('*')[0].replace('=', '') }}
        </p>
      </div>
    </div>
    <div class="table-content">
      <div
        v-for="(item, index) in data"
        :key="index"
        :class="{ selectable: selectable }"
        @click.prevent="handleClick(item)"
      >
        <div
          v-for="(key, i) in layout.keys"
          :key="key"
          :style="`flex:${calcWidth[i]};text-align:${calcAlign[i]}`"
        >
          <img
            v-if="isImage(key)"
            :src="item[isImage(key)]"
            :draggable="false"
            @click.stop="handleViewImage(item[isImage(key)])"
          />
          <p v-else :style="`text-align:${calcAlign[i]}`">
            {{ formatData(key, item) }}
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
interface DataType {
  [propName: string]: string | number | string[] | number[]
}

export default defineComponent({
  name: 'MyTable',
  displayName: 'm-table',
  components: { MyModal },
  props: {
    /** 布局模板 */
    template: {
      type: Array as PropType<string[]>,
      required: true,
    },
    /** 数据 */
    data: {
      type: Array as PropType<DataType[]>,
      default: () => [],
    },
    /** 数据的格式化方法对象集合 */
    formatter: {
      type: Object as PropType<FormatterType>,
      default: null,
    },
    /** 是否可选择 */
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
    const handleClick = (data: DataType): void => {
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
      if (!layout.value) return ['center', 'center', 'center']
      const { length } = layout.value.header
      return layout.value.header.map((item) => {
        const index = item.indexOf('=')
        if (index === 0) return 'left'
        if (index === length) return 'right'
        return 'center'
      })
    })

    const imgSrc = ref<string | null>(null)
    const showImgModal = ref(false)
    const handleViewImage = (src: string): void => {
      imgSrc.value = src
      showImgModal.value = true
    }
    /** 是图片则返回图片的key，否则返回false */
    const isImage = (key: string): string | false => {
      if (key.match(/#(\w*)[>:]?/)) {
        if (RegExp.$1 === 'image') {
          key.match(/(\w*)[#>:]?/)
          return RegExp.$1
        }
        return false
      }
      return false
    }
    const formatData = (key: string, data: DataType): unknown => {
      const { formatter } = props
      key.match(/(\w*)[#>:]?/)
      const dataKey = RegExp.$1
      if (formatter && key.match(/>(\w*)[#:]?/)) {
        return formatter[RegExp.$1](data[dataKey])
      }
      return data[dataKey] || ''
    }
    return {
      layout,
      handleClick,
      calcWidth,
      calcAlign,
      imgSrc,
      handleViewImage,
      showImgModal,
      isImage,
      formatData,
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
      align-items center
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
        max-height 1rem
        max-width 100%
        cursor pointer
        margin-top .05rem
</style>
