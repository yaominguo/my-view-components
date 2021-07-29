<template>
  <div class="my-form">
    <div v-for="(row, rowIndex) in template" :key="rowIndex" class="row">
      <div
        v-for="(col, colIndex) in row.split('|')"
        :key="colIndex"
        class="col"
        :style="{ flex: calcWidth(col) }"
      >
        <p :style="`width: ${labelWidth}; text-align: ${calcAlign(col)}`">
          {{ getLabel(col) }}
        </p>
        <img
          v-if="getImage(col).isImg"
          :src="getImage(col).src"
          :draggable="false"
          @click.stop="handleViewImage(getImage(col).src)"
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
import { computed, defineComponent, PropType, ref } from 'vue'
import MyModal from '../MyModal/my-modal.vue'

interface FormatterType {
  [propName: string]: <T>(val: T, data?: DataType) => T
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
    const datasource = computed(() => props.data)
    const calcWidth = (key: string): number => {
      if (!key) return 1
      if (key.match(/\*(\d*)[#>:]?/)) {
        return +RegExp.$1
      }
      return 1
    }
    const getLabel = (key: string): string => {
      if (!key) return ''
      if (key.match(/:([\u4e00-\u9fa5]*[^#=>\*]*)[#>\*]?/)) {
        return RegExp.$1 + '：'
      }
      return ''
    }
    const imgSrc = ref<string | null>(null)
    const showImgModal = ref(false)
    const handleViewImage = (src: string): void => {
      imgSrc.value = src
      showImgModal.value = true
    }
    /** 判断并返回图片src */
    const getImage = (key: string): { isImg: boolean; src: string } => {
      const result = {
        isImg: false,
        src: '',
      }
      if (key && key.match(/#(\w*)[>:=]?/)) {
        if (RegExp.$1 === 'image') {
          key.match(/=?(\w*)[#>:]?/)
          result.src = datasource.value[RegExp.$1] as string
          result.isImg = true
        }
      }
      return result
    }
    const formatData = (key: string): unknown => {
      if (!key) return ''
      const { formatter, data } = props
      key.match(/=?(\w*)[#>\*:]?/)
      const dataKey = RegExp.$1
      if (formatter && key.match(/>(\w*)[#\*:]?/)) {
        return formatter[RegExp.$1](data[dataKey], data)
      }
      return data[dataKey] || ''
    }

    const calcAlign = (key: string): string => {
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
      getImage,
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
