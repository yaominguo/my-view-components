<template>
  <div id="MapContainer" />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
declare const AMap: any
interface MarkersProp {
  x: number | string
  y: number | string
}

export default defineComponent({
  name: 'MyMap',
  displayName: 'm-map',
  emits: ['complete', 'marker-click'],
  setup(props, ctx) {
    const map = ref<any>(null)
    const markers = ref<any[]>([])
    const sizeRate = computed(() => Number((screen.height / 800).toFixed(1)))
    const injectMapJs = () => {
      if (!document.querySelector('#_MapJs')) {
        const mapJs = document.createElement('script')
        mapJs.src =
          'http://webapi.amap.com/maps?v=1.4.15&key=ee2b5d5c0c44c768f1d2593eb4a7dfa6&plugin=Map3D,AMap.DistrictSearch'
        mapJs.setAttribute('id', '_MapJs')
        mapJs.onload = async () => {
          await nextTick()
          initMap()
        }
        document.head.appendChild(mapJs)
      }
    }
    const initWallLayer = (
      name = '黄浦区',
      color = 'rgba(0,242,255,0.3)',
      height = 1500
    ) => {
      const object3DLayer = new AMap.Object3DLayer({ zIndex: 100 })
      map.value.add(object3DLayer)
      const district = new AMap.DistrictSearch({
        subdistrict: 0,
        extensions: 'all',
        level: 'city',
      })
      district.search(name, function (status, result) {
        const wall = new AMap.Object3D.Wall({
          path: result.districtList[0].boundaries,
          height,
          color,
        })
        wall.backOrFront = 'both'
        wall.transparent = true
        object3DLayer.add(wall)
      })
    }
    const initMap = () => {
      const mapConfig = {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        showLabel: true,
        zoom: 14,
        pitch: 50,
        rotation: 45,
        viewMode: '3D', // 开启3D视图,默认为关闭
        buildingAnimation: true, // 楼块出现是否带动画
        expandZoomRange: true,
        zooms: [10, 20],
        center: [121.5112, 31.195],
        showIndoorMap: false,
        // mapStyle: 'amap://styles/grey',
        mapStyle: 'amap://styles/fa9ac17bb73a5cc74c551d8e8162086d',
        features: ['bg', 'road', 'building'],
        layers: [
          new AMap.TileLayer(),
          new AMap.Buildings({
            zooms: [10, 20],
            zIndex: 10,
          }),
        ],
      }
      map.value = new AMap.Map('MapContainer', mapConfig).on(
        'click',
        ({ lnglat }) => {
          console.log('click-lnglat: ', [lnglat.lng, lnglat.lat])
        }
      )
      initWallLayer()
      ctx.emit('complete', true)
    }
    const addMarkers = (data: MarkersProp[]) => {
      map.value.remove(markers.value)
      markers.value = data.map((item) => {
        const { x, y } = item // TODO
        const marker = new AMap.Marker({
          position: [+x, +y],
          zIndex: 99,
          icon: new AMap.Icon({
            size: [16 * sizeRate.value, 20 * sizeRate.value],
            image: '/src/assets/images/dimond1.png',
          }),
          extData: { ...item },
        }).on('click', () => ctx.emit('marker-click', marker.getExtData()))
        return marker
      })
      map.value.add(markers.value)
    }
    const focus = (x: number | string, y: number | string, zoom = 18.5) => {
      map.value.setZoomAndCenter(zoom, [x, y])
    }
    onMounted(injectMapJs)
    return {
      map,
      markers,
      initWallLayer,
      addMarkers,
      focus,
    }
  },
})
</script>

<style lang="stylus" scoped>
#MapContainer
  position fixed
  top 0
  right 0
  bottom 0
  left 0
</style>
<style lang="stylus">
.amap-logo
.amap-copyright
  display none !important
.amap-icon
  img
    width 100%
    height 100%
</style>
