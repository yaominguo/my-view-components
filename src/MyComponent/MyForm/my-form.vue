<template>
  <div class="my-form">
    <div v-for="(row, rowIndex) in template" :key="rowIndex" class="row">
      <div
        v-for="(col, colIndex) in row.split('|')"
        :key="colIndex"
        class="col"
        :style="{ flex: calcWidth(col) }"
      >
        <p :style="{ width: labelWidth, textAlign: calcAlign(col) }">
          {{ getLabel(col) }}
        </p>
        <img
          v-if="isImage(col)"
          :src="data[isImage(col)]"
          :draggable="false"
          @click.stop="handleViewImage(data[isImage(col)])"
        />
        <p v-else class="content">
          {{ formatData(col) }}
        </p>
      </div>
    </div>
    <MyModal v-model="showImgModal" title="照片预览">
      <img v-if="showImgModal && imgSrc" style="width: 100%" :src="imgSrc" />
    </MyModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import MyModal from '../MyModal/my-modal.vue'

interface FormatterType {
  [propName: string]: <T>(val: T) => T
}
interface DataType {
  [propName: string]: string | number | string[] | number[]
}

export default defineComponent({
  name: 'MyForm',
  displayName: 'm-form',
  components: { MyModal },
  props: {
    /** 布局模板 */
    template: {
      type: Array as PropType<string[]>,
      required: true,
    },
    /** 数据 */
    data: {
      type: Object as PropType<DataType>,
      default: null,
    },
    /** 数据的格式化方法对象集合 */
    formatter: {
      type: Object as PropType<FormatterType>,
      default: null,
    },
    /** label宽度 */
    labelWidth: {
      type: String as PropType<string>,
      default: '1rem',
    },
  },
  setup(props) {
    const calcWidth = (key: string) => {
      if (!key) return 1
      if (key.match(/\*(\d*)[#>:]?/)) {
        return RegExp.$1
      }
      return 1
    }
    const getLabel = (key: string) => {
      if (!key) return ''
      if (key.match(/:([\u4e00-\u9fa5\w]*)[#>\*]?/)) {
        return RegExp.$1 + '：'
      }
      return ''
    }
    const imgSrc = ref<string | null>(null)
    const showImgModal = ref(false)
    const handleViewImage = (src: string) => {
      imgSrc.value = src
      showImgModal.value = true
    }
    const isImage = (key: string) => {
      if (!key) return false
      if (key.match(/#(\w*)[>:]?/)) {
        if (RegExp.$1 === 'image') {
          key.match(/=?(\w*)[#>:]?/)
          return RegExp.$1
        }
        return false
      }
      return false
    }
    const formatData = (key: string) => {
      if (!key) return ''
      const { formatter, data } = props
      key.match(/=?(\w*)[#>\*:]?/)
      const dataKey = RegExp.$1
      if (formatter && key.match(/>(\w*)[#\*:]?/)) {
        return formatter[RegExp.$1](data[dataKey])
      }
      return data[dataKey] || ''
    }

    const calcAlign = (key: string) => {
      if (!key) return 'right'
      const index = key.indexOf('=')
      if (index === 0) return 'left'
      if (index === key.length - 1) return 'right'
      return 'right'
    }

    return {
      calcWidth,
      getLabel,
      handleViewImage,
      isImage,
      imgSrc,
      showImgModal,
      formatData,
      calcAlign,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../main.styl'
.my-form
  $full()
  .row
    display flex
    background $table-content-bg
    padding .08rem 0
    &:nth-child(odd)
      background transparent
    .col
      display flex
      align-items center
      p
        padding 0 .05rem
        box-sizing border-box
      >.content
        flex 1
        padding-left 0
      >img
        max-height .6rem
        cursor pointer
</style>
