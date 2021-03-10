// import {
//   defineComponent,
//   PropType,
//   onBeforeUnmount,
//   onMounted,
//   ref,
//   watch,
// } from 'vue'
// import { CountUp, CountUpOptions } from 'countup.js'

// export default defineComponent({
//   name: 'MyCount',
//   displayName: 'm-count',
//   props: {
//     value: {
//       type: [Number, String] as PropType<number | string>,
//       default: 0,
//     },
//     /** 保留几位小数，默认为0 */
//     decimal: {
//       type: [Number, String] as PropType<number | string>,
//       default: 0,
//     },
//     /** 数字跳动速度 默认为2 */
//     speed: {
//       type: [Number, String] as PropType<number | string>,
//       default: 2,
//     },
//     /** 是否隔一段时间自动跳动 默认为false */
//     autoPlay: {
//       type: Boolean as PropType<boolean>,
//       default: false,
//     },
//     /** autoPlay开启后的间隔时间设置 默认为10 */
//     duration: {
//       type: [Number, String] as PropType<number | string>,
//       default: 10,
//     },
//   },
//   setup(props) {
//     const endValue = ref(+props.value)
//     const countRef = ref<null | HTMLElement>(null)
//     const countUpInstance = ref<CountUp | null>(null)
//     const timer = ref<null | number>(null)
//     const options: CountUpOptions = {
//       decimalPlaces: +props.decimal,
//       duration: +props.speed,
//     }
//     onMounted(() => {
//       const countUp = new CountUp(
//         countRef.value as HTMLElement,
//         endValue.value,
//         options
//       )
//       if (!countUp.error) {
//         countUp.start()
//       } else {
//         console.error(`m-count error: ${countUp.error}`)
//       }
//       countUpInstance.value = countUp
//       if (props.autoPlay) {
//         timer.value = +setInterval(() => {
//           countUp.reset()
//           countUp.update(endValue.value)
//         }, +props.duration * 1000)
//       }
//     })
//     watch(
//       () => props.value,
//       (cur) => {
//         endValue.value = +cur
//         if (
//           countUpInstance.value &&
//           typeof countUpInstance.value.update === 'function'
//         )
//           countUpInstance.value.update(+cur)
//       }
//     )
//     onBeforeUnmount(() => {
//       clearInterval(Number(timer.value))
//       timer.value = null
//       countUpInstance.value = null
//     })
//     // return {
//     //   countRef,
//     //   countUpInstance,
//     //   endValue,
//     // }
//     return () => <span ref={countRef}></span>
//   },
// })
